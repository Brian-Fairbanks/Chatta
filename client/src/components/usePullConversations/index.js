import { useState, useEffect } from "react";

export default function usePullConversations() {
  const [conversations, setConversations] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function getConversations() {
      // set up fetch requests
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: 'application/json',
        },
      };

      const response = await fetch("/api/conversation", requestOptions)
        .then(async function(res){
          const data = await res.json();
          setConversations(data.dbModel);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    getConversations();
  }, []);
  return {
    conversations,
    isLoading,
  };
}
