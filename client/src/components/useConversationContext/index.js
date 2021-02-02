import { useState } from "react";

export default function useChatroomContext() {
  const [conversation, setConversation] = useState("No conversation selected.");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);

  return {
    conversation,
    setConversation,
    messages,
    setMessages,
    participants,
    setParticipants,
  };
}