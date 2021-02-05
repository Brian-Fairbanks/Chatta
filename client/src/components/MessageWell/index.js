import { Box } from "@material-ui/core";
import { useContext } from "react";
import { ChatroomContext } from "../../utils/ChatroomContext";
import { UserContext } from "../../utils/UserContext";
import Message from "../Message";

function MessageWell() {
  const { conversation, participants, messages } = useContext(ChatroomContext);
  const { user } = useContext(UserContext);

  return (
    <Box>
      {!conversation ? (
        "No conversation selected."
      ) : (
        <Box>
          {!messages
            ? ""
            : messages.map((message) => {
                // figure out if this is you or another user
                const author = participants.filter(
                  (user) => user._id == message.author
                )[0];
                // render the message to the screen
                return (
                  <Message
                    key={message._id}
                    content={message.content}
                    timeStamp={message.timestamp}
                    isSelf={author && author._id === user._id}
                    username={author ? author.username : ""}
                    image={author ? author.image : ""}
                  />
                );
              })}
        </Box>
      )}
    </Box>
  );
}

export default MessageWell;
