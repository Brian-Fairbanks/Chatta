import { Box, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { ChatroomContext } from "../../utils/ChatroomContext";

function MessageWell(){
  const { conversation, participants, messages} = useContext(ChatroomContext);
  useEffect(() => {
    console.log("change happens")
  }, [conversation])
  return(
    <Box>
      <Typography variant="h1">Message Well</Typography>
      {conversation?conversation:"No conversation selected."}
    </Box>
  )
}

export default MessageWell;
