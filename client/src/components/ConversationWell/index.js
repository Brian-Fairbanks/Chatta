import { Box, Button} from "@material-ui/core";
import { useContext } from "react";
import ConversationTile from "../ConversationTile";
import usePullConversations from "../usePullConversations";
import {ChatroomContext} from "../../utils/ChatroomContext";
import utils from "../../utils/API";

// Previous Conversation Well Creation
function ConversationWell() {
  // Set up constatnts
  const { conversations, isLoading } = usePullConversations();
  const { setConversation, setParticipants, setMessages} = useContext(ChatroomContext);

  // Handle updating conversation
  async function changeConversation(id){
    setConversation(id);
    const data = await utils.GetConversation({id});
    setConversation(data.conversation);
    setMessages(data.messages)
    setParticipants(data.participants);
  }

  return (
    <Box>
      {isLoading
        ? "Loading"
        : conversations.map((chat) => {
            return (
              <Box
                key={chat._id}
                onClick={() => {changeConversation(chat._id)}}
              >
                <ConversationTile
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
