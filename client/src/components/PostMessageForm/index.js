import { useState, useContext, useEffect } from "react";
import { theme } from "../../themes/theme";
import {
  Box,
  FormControl as Form,
  Grid,
  TextField,
  makeStyles,
  TextareaAutosize,
} from "@material-ui/core";
import { ChatroomContext } from "../../utils/ChatroomContext";
import utils from "../../utils/API";

const useStyles = makeStyles({
  form: {
    width: "100%",
    marginBottom:30,
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
  const classes = useStyles();
  const [userSubmission, setUserSubmission] = useState({
    conversation: "",
    content: "",
  });
  const { conversation } = useContext(ChatroomContext);

  useEffect(() => {
    setUserSubmission({ conversation:conversation._id, content:"" });
  }, [conversation]);

  // handleSubmission
  async function handleSubmit(event = null) {
    if (event) {
      event.preventDefault();
    }
    const data = await utils.postMessage(userSubmission);
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
            placeholder="Type something..."
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
