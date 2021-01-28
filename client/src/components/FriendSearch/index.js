import React from 'react'
import { Box, Grid, Typography } from "@material-ui/core";
import FriendTile from "../FriendTile";
import useSearchUsers from "../useSearchUsers";

// Sample friend data untill the back end is working correctly
// Friend Well Creation
function FriendSearch() {
  const { users, isLoading } = useSearchUsers("bri");

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {/* {isLoading
        ? "Loading"
        : users.map((user) => {
            return <div key={user}>{user.username}</div>;
          })} */}
    </Box>
  );
}

export default FriendSearch;
