import { useState, useContext, useEffect } from "react";
import { theme } from "../../themes/theme";
import {
  Box,
  FormControl as Form,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import { ChatroomContext } from "../../utils/ChatroomContext";
import utils from "../../utils/API";

const useStyles = makeStyles({
  form: {
    width: "100%",
    marginBottom: 30,
  },
  messageEditor: {
    "&::placeholder": {
      color: theme.palette.primary.selfDark,
      fontFamily: ["Open Sans", "Arial", "sans-serif"],
      fontSize: 14,
      fontWeight: "600",
    },

    border: "none",
    resize: "none",
    background: theme.palette.primary.selfLight,
    color: theme.palette.primary.selfDark,
    padding: 40,
    fontFamily: ["Open Sans", "Arial", "sans-serif"],
    fontSize: 14,
    fontWeight: "600",
    outline: "none",
    borderRadius: 10,
  },
});

function PostMessageForm() {
  // set up constants
  const classes = useStyles();
  const [userSubmission, setUserSubmission] = useState({
    conversation: "",
    content: "",
  });
  const {
    conversation,
    setConversation,
    setMessages,
    participants,
    setParticipants,
    socket,
  } = useContext(ChatroomContext);

  // clear messages and change converstaion when a user clicks another conversation page
  useEffect(() => {
    setUserSubmission({ conversation: conversation._id, content: "" });
  }, [conversation]);

  // handleSubmission
  async function handleSubmit(event = null) {
    if (event) {
      event.preventDefault();
    }
    // if this is the first message of a conversation, create the conversation and post it, then update the conversation settings
    if (!conversation._id) {
      //create a new conversation
      const participantData = await participants.map((user) => user._id);
      const conversationID = await utils.createConversation({
        participants: participantData,
      });
      // post new message to this conversation
      const data = await utils.postMessage({
        conversation: conversationID._id,
        content: userSubmission.content,
      });
      setUserSubmission((prevData) => {
        return { ...prevData, content: "" };
      });
      // update page as if opening existing conversation
      const conversationData = await utils.GetConversation({
        id: conversationID._id,
      });
      setConversation(conversationData.conversation);
      setMessages(conversationData.messages);
      setParticipants(conversationData.participants);
      return;
    }
    //otherwise, just post it
    const data = await utils.postMessage(userSubmission);
    // no need to send message, the backend is handling this now.

    // clear message
    setUserSubmission((prevData) => {
      return { ...prevData, content: "" };
    });
  }

  // function to handle submitting the form when pressing enter, or adding new lines with alt/ctrl/shift + enter
  function onEnterPress(e) {
    if (e.key === "Enter") {
      // alt and ctrl+enter should add a new line, but not submit
      if (e.ctrlKey || e.altKey) {
        setUserSubmission((prevData) => {
          return { ...prevData, content: prevData.content + "\n" };
        });
      }
      // shift+enter should just return, and not submit (it still adds a line correctly)
      else if (e.shiftKey) {
        return;
      }
      // enter by itself will submit the form
      else {
        handleSubmit();
      }
    }
  }

  // function to aid in setting states
  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserSubmission((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  return (
    <Box>
      {conversation === "No conversation selected." ? (
        ""
      ) : (
        <Form className={classes.form} onSubmit={handleSubmit}>
          <TextareaAutosize
            className={classes.messageEditor}
            name="content"
            id="standard-basic-fname"
            placeholder={
              conversation && !conversation._id
                ? "Start a new conversation!"
                : "Type something..."
            }
            value={userSubmission.content}
            onChange={handleInputChange}
            onKeyUp={onEnterPress}
          />
        </Form>
      )}
    </Box>
  );
}

export default PostMessageForm;
