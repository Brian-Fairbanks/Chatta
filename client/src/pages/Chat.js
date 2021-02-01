import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import ConversationWell from "../components/ConversationWell";
import MessageWell from "../components/MessageWell";
import PostMessageForm from "../components/PostMessageForm";
// import API from "../../utils/API";

const useStyles = makeStyles({
  fullPage: {
    width: "100vw",
    maxHeight: "100vh",
    minHeight: "100vh",
    overflowY: "scroll",
  },
  scrollContent: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: "scroll",
  },
  scrollWrapper: {
    position: "relative",
    overflow: "hidden",
  },
});

function ChatPage() {
  // set up styles for use by elements
  const classes = useStyles();

  return (
    <Grid container className={classes.fullPage}>
      <Grid item xs={3}>
        <Box p={3}>
          {/* <SelfSettings/> */}
          <Typography variant="h1">Chats</Typography>
          <FriendSearch />
          <ConversationWell />
        </Box>
      </Grid>
      <Grid container item xs={9} height="100%" direction="column">
        <Typography variant="h1">Message Well</Typography>
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
