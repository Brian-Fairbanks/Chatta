import { Box, Grid, Typography } from "@material-ui/core";
import FriendTile from "../FriendTile";

// Sample friend data untill the back end is working correctly
const sampleFriends=[
  {
    '_id':"exampleid",
    image:"https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
    username:"Akuma"
  },
  {
    '_id':"exampleid",
    image:"https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
    username:"Shums"
  },
  {
    '_id':"exampleid",
    image:"https://3k67ko48fxrx2usj0z384y49-wpengine.netdna-ssl.com/wp-content/uploads/2016/06/anonymous-user-ico-300x300-200x200.png",
    username:"Brian"
  }
]


// Friend Well Creation
function FriendsWell(){
  return(
    <Box>
      <Typography variant="h2">Chats</Typography>
      {sampleFriends.map( friend => {
        return <FriendTile key={friend.username} username={friend.username} image={friend.image}/>
      })}
    </Box>
  )
}

export default FriendsWell;
