import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import ConversationWell from "../components/ConversationWell";
import MessageWell from "../components/MessageWell";
import PostMessageForm from "../components/PostMessageForm";
import ConversationTitleCard from "../components/ConversationTitleCard";
import SelfSettings from "../components/SelfSettings";
// import API from "../../utils/API";

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
});

function ChatPage() {
  // set up styles for use by elements
  const classes = useStyles();

  return (
    <Grid container className={classes.fullPage}>
      <Grid item xs={3}>
        <Box px={3} height="100%" display="flex" flexDirection="column">
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
