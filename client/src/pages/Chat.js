import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import ConversationWell from "../components/ConversationWell";
import MessageWell from "../components/MessageWell";
import PostMessageForm from "../components/PostMessageForm";
import ConversationTitleCard from "../components/ConversationTitleCard";
import SelfSettings from "../components/SelfSettings";
import Socket from "../utils/Socket";
import { useContext, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import { ChatroomContext } from "../utils/ChatroomContext";

const useStyles = makeStyles({
  fullPage: {
    width: "100vw",
    maxHeight: "100vh",
    minHeight: "100vh",
  },
  scrollContent: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflowY: "auto",
  },
  scrollWrapper: {
    position: "relative",
    overflow: "hidden",
  },
  leftPanel: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

function ChatPage() {
  // set up styles for use by elements
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const {
    setConversation,
    setMessages,
    setSocket,
    setTriggerConversations,
  } = useContext(ChatroomContext);

  // setup the socket information
  useEffect(() => {
    // callback function when socket says you got a new message
    async function addMessage(data) {
      // this seems like a very roundabout way to do this...
      // but this seems to be the only way to garuntee using the most current conversation data
      let curConversation;
      setConversation((currentState) => {
        // Do not change the state by get the updated state
        curConversation = currentState;
        return currentState;
      });

      // if you are in the correct chatroom for the recieved message, add it to the message array
      if (
        curConversation._id &&
        data.conversation.toString() === curConversation._id.toString()
      ) {
        setMessages((prevMessages) => {
          return [...prevMessages, data];
        });
      }
      //otherwise, refresh your conversation data so it shows the update
      else {
        setTriggerConversations(true);
      }
    }

    // Set up the socket to be used for sending and receiving messages, and store it in the conversation context
    async function setUpSocket() {
      const thisSocket = await Socket.connect(user);
      setSocket(Socket);

      //setup listen function
      thisSocket.on("newMessage", (data) => {
        addMessage(data);
      });
    }
    if (user) {
      //ensure that user has already been authenticated before connecting the socket
      setUpSocket();
    }
  }, [user]);

  return (
    <Grid container className={classes.fullPage}>
      <Grid item xs={3}>
        <Box px={3} className={classes.leftPanel}>
          <SelfSettings />
          <Typography variant="h3">Chats</Typography>
          <Box flexGrow={1} className={classes.scrollWrapper}>
            <Box className={classes.scrollContent}>
              <FriendSearch />
              <ConversationWell />
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid container item xs={9} height="100%" direction="column">
        <ConversationTitleCard />
        <Box flexGrow={1} className={classes.scrollWrapper}>
          <Box className={classes.scrollContent} px={5}>
            <MessageWell />
          </Box>
        </Box>
        <Box px={5}>
          <PostMessageForm />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatPage;
