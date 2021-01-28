import { Box, Grid, Typography } from "@material-ui/core";
import FriendTile from "../FriendTile";
import usefindUsersFriends from "../useFindUsersFriends";

// Sample friend data untill the back end is working correctly
// const sampleFriends=[
//   {
//     '_id':"exampleid",
//     image:"https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
//     username:"Akuma"
//   },
//   {
//     '_id':"exampleid",
//     image:"https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
//     username:"Shums"
//   },
//   {
//     '_id':"exampleid",
//     image:"https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
//     username:"Brian"
//   }
// ]


// Friend Well Creation
function FriendsWell() {
  const { users, isLoading } = usefindUsersFriends();

  return (
    <Box>
      <Typography variant="h1">Chats</Typography>
      {isLoading
        ? "Loading"
        : users.map((friend) => {
            return (
                <FriendTile
                key={friend.participants}
                title={friend.title? friend.title:friend.participants}
                message = {friend.lastMessage?friend.lastMessage.content:""}
                image={friend.image}
              />
            );
          })}
    </Box>
  );
}

export default FriendsWell;
