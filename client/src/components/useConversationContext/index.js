import { useState } from "react";

export default function useChatroomContext() {
  const [conversation, setConversation] = useState("No conversation selected.");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState([]);
  const [conversationList, setConversationList] = useState([]);
  const [triggerConversations, setTriggerConversations] = useState(true);

  return {
    conversation,
    setConversation,
    conversationList,
    setConversationList,
    messages,
    setMessages,
    participants,
    setParticipants,
    socket,
    setSocket,
    triggerConversations,
    setTriggerConversations,
  };
}
