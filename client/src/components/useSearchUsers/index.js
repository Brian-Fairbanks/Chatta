import { useState, useEffect } from "react";

export default function useFindUser(searchTerm) {
  const [users, setUser] = useState(null);
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

      const response = await fetch("/api/user/search/"+searchTerm, requestOptions)
        .then(async function(res){
          const data = await res.json();
          setUser(data.dbModel);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    findUser();
  }, []);
  return {
    users,
    isLoading,
  };
}
