import { useState, useEffect } from "react";

export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function findUser() {
      // set up fetch requests
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: 'application/json',
        },
      };

      const response = await fetch("/auth", requestOptions)
        .then(async function(res){
          const data = await res.json();
          setUser(data.user);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    findUser();
  }, []);
  return {
    user,
    isLoading,
  };
}
