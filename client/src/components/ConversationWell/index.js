import { Box, Button} from "@material-ui/core";
import { useContext } from "react";
import ConversationTile from "../ConversationTile";
import usePullConversations from "../usePullConversations";
import {ChatroomContext} from "../../utils/ChatroomContext";

// Previous Conversation Well Creation
function ConversationWell() {
  // Set up constatnts
  const { conversations, isLoading } = usePullConversations();
  const { conversation, setConversation, participants, messages} = useContext(ChatroomContext);

  // Handle updating conversation
  function changeConversation(id){
    console.log(conversation);
    console.log("Selected",id)
    setConversation(id);
  }

  return (
    <Box>
      {isLoading
        ? "Loading"
        : conversations.map((chat) => {
            return (
              <Box
                onClick={() => {changeConversation(chat._id)}}
              >
                <ConversationTile
                  key={chat.participants}
                  title={chat.title ? chat.title : chat.participants}
                  message={chat.lastMessage ? chat.lastMessage.content : ""}
                  image={chat.image}
                />
              </Box>
            );
          })}
    </Box>
  );
}

export default ConversationWell;
