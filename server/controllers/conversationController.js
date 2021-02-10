const db = require("../models");

// Defining methods for the Chat Controller
module.exports = {
  findUsers: async function (req, res) {
    try {
      // Gather all conversations, and their participants
      const data = await db.Conversation.find({
        participants: req.user._id,
      })
        .populate("participants")
        .sort({ lastUpdate: -1 });

      // Add extra data, usefull for display
      const extraData = await Promise.all(
        data.map(async function (conversation) {
          //Filter self out of participants
          const userData = conversation.participants.filter(
            (user) => user._id.toString() !== req.user._id.toString()
          );
          // set up a title as either conversation.title, or a list of participating users
          const title =
            conversation.title ||
            userData.map((user) => {
              return user.username;
            });
          // set up image : use conversation image if one exists.  Otherwise, try and use the user[0]s image.  Otherwise, return null and let the Avatar handle it.
          const image = conversation.image
            ? conversation.image
            : userData[0]
            ? userData[0].image
            : null;

          //set up status
          const status = userData[0] ? userData[0].status : "offline";

          // Return conversation data with additional changes
          return {
            lastMessage: conversation.lastMessage,
            _id: conversation._id,
            owner: conversation.owner,
            lastUpdate: conversation.lastUpdate,
            __v: conversation.__v,
            participants: conversation.participants,
            image,
            title:
              title.length > 0
                ? title.join(", ")
                : `${req.user.username} (you)`,
            status,
            notifications: conversation.totalCount | 0,
          };
        })
      );
      res.json({ dbModel: extraData });
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
          return {
            _id: member,
            username: user.username,
            image: user.image,
            // default to offline if status has never been set.
            status: user.status || "offline",
          };
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
