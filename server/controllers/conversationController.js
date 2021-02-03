const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findUsers: async function (req, res) {
    try {
      const data = await db.Conversation.find({
        participants: req.user._id,
      });

      const dataWithParticipants = await Promise.all(
        data.map(async function (conversation) {
          //Filter self out of participants
          const otherUsers = await conversation.participants.filter(
            (user) => user.toString() !== req.user._id.toString()
          );

          // get other Participant data
          const userData = await Promise.all(
            otherUsers.map(async function (member) {
              const user = await db.User.findOne({ _id: member });
              return {
                _id: member,
                username: user.username,
                image: user.image,
              };
            })
          );
          // set up a title as either conversation.title, or a list of participating users
          const title =
            conversation.title ||
            (await Promise.all(
              userData.map((user) => {
                return user.username;
              })
            ));
          // set up image : use conversation image, unless it is the default.  If it is not, use the first participants image.  If no participants, revert back to default
          const image =
            conversation.image !==
            "https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png" // the default image
              ? conversation.image
              : userData[0]
              ? userData[0].image
              : conversation.image;

          // Return conversation data with additional changes
          return {
            lastMessage: conversation.lastMessage,
            _id: conversation._id,
            owner: conversation.owner,
            lastUpdate: conversation.lastUpdate,
            __v: conversation.__v,
            image,
            title:
              title.length > 0
                ? title.join(", ")
                : `${req.user.username} (you)`,
            participants: userData,
          };
        })
      );
      // console.log(dataWithParticipants);
      res.json({ dbModel: dataWithParticipants });
    } catch (err) {
      res.status(422).json(err);
    }
  },

  findById: async function (req, res) {
    try {
      // get room data
      const conversation = await db.Conversation.findById(req.params.id);
      // validate user is in conversation
      if (!conversation.participants.includes(req.user._id)) {
        return res
          .status(401)
          .json({ msg: "You are not a part of this conversation" });
      }
      // get all posted messages
      const messages = await db.Message.find({
        conversation: req.params.id,
      }).sort({ timestamp: 1 });

      const userData = await Promise.all(
        conversation.participants.map(async function (member) {
          const user = await db.User.findOne({ _id: member });
          return { _id: member, username: user.username, image: user.image };
        })
      );

      res.json({
        conversation,
        messages,
        participants: userData,
      });
    } catch (err) {
      res.status(422).json(err);
    }
  },

  create: function (req, res) {
    // anything passed from the backend? use that
    const convo = req.body;
    // otherwise set up empty participant list.
    if (!convo.participants) {
      convo.participants = [];
    }
    // add self to participant last
    convo.participants.push(req.user._id);
    // and add self as owner
    convo.owner = req.user._id;

    db.Conversation.create(convo)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
