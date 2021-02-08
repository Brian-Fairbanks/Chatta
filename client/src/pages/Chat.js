import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import ConversationWell from "../components/ConversationWell";
import MessageWell from "../components/MessageWell";
import PostMessageForm from "../components/PostMessageForm";
import ConversationTitleCard from "../components/ConversationTitleCard";
import SelfSettings from "../components/SelfSettings";
import useSocket from "../utils/UseSocket";
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
  const { conversation, messages, setMessages } = useContext(ChatroomContext);
  const { socket, setSocket } = useContext(ChatroomContext);

  // setup the socket information
  useEffect(
    async function () {
      if (user) {
        // callback
        async function addMessage(data) {
          console.log("Got a message from the server!");
          setMessages((prevMessages) => {
            return [...prevMessages, data];
          });
        }

        const thisSocket = await useSocket.connect(user);
        setSocket(useSocket);

        //setup function recieving data
        thisSocket.on("newMessage", (data) => {
          addMessage(data);
        });
      }
    },
    [user]
  );

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
