import { Box, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { ChatroomContext } from "../../utils/ChatroomContext";

function MessageWell(){
  const { conversation, participants, messages} = useContext(ChatroomContext);

  useEffect(() => {
    console.log("change happens/n",conversation)
  }, [conversation])

  return(
    <Box>
      <Typography variant="h1">Message Well</Typography>
      {!conversation?"No conversation selected."
      :
      <Box>
        <Typography variant={"h1"}>{conversation.title||conversation._id}</Typography>
        {
          messages.map( message => {
            return(<div>{message.content}</div>)
          })
        }
      </Box>
      }
    </Box>
  )
}

export default MessageWell;
