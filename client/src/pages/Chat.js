import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FriendSearch from "../components/FriendSearch";
import ConversationWell from "../components/ConversationWell";
import MessageWell from "../components/MessageWell";
import PostMessageForm from "../components/PostMessageForm";
// import API from "../../utils/API";

const useStyles = makeStyles({
});

function ChatPage(){
    // set up styles for use by elements
    const classes = useStyles();

  return(
    <Box>
      <Grid container>
        <Grid item xs={3}>
          <Box p={3}>
            {/* <SelfSettings/> */}
            <Typography variant="h1">Chats</Typography>
            <FriendSearch/>
            <ConversationWell/>
          </Box>
        </Grid>
        <Grid container item xs={9} direction="column">
          <Box flexGrow={1} px={12}>
            <MessageWell/>
          </Box>
          <Box px={12}>
            <PostMessageForm/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatPage