import { Box, CircularProgress } from "@material-ui/core";
import { useContext, useEffect } from "react";
import ConversationTile from "../ConversationTile";
import { ChatroomContext } from "../../utils/ChatroomContext";
import utils from "../../utils/API";

// Previous Conversation Well Creation
function ConversationWell() {
  // Set up constatnts
  const {
    triggerConversations,
    setTriggerConversations,
    setConversation,
    conversationList,
    setConversationList,
    setParticipants,
    setMessages,
  } = useContext(ChatroomContext);

  // Handle updating conversation
  async function changeConversation(id) {
    const data = await utils.GetConversation({ id });
    setConversation(data.conversation);
    setMessages(data.messages);
    setParticipants(data.participants);
  }

  // reload the conversations whenever triggerConversations is set
  useEffect(
    async function () {
      if (triggerConversations) {
        const convos = await utils.getConversations();
        setConversationList(convos.dbModel);
        setTriggerConversations(false);
      }
    },
    [triggerConversations]
  );

  return (
    <Box>
      {!conversationList ? (
        <CircularProgress />
      ) : (
        conversationList.map((chat) => {
          return (
            <Box
              key={chat._id}
              onClick={() => {
                changeConversation(chat._id);
              }}
            >
              <ConversationTile
                title={chat.title ? chat.title : chat.participants}
                message={chat.lastMessage ? chat.lastMessage.content : ""}
                image={chat.image}
                status={chat.status}
              />
            </Box>
          );
        })
      )}
    </Box>
  );
}

export default ConversationWell;
