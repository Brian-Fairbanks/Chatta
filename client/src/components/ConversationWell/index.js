import { Box} from "@material-ui/core";
import ConversationTile from "../ConversationTile";
import usefindUsersFriends from "../useFindUsersFriends";

// Friend Well Creation
function ConversationWell() {
  const { users, isLoading } = usefindUsersFriends();

  return (
    <Box>
      {isLoading
        ? "Loading"
        : users.map((friend) => {
            return (
                <ConversationTile
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

export default ConversationWell;
