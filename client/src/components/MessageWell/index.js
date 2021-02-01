import { Box, Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { ChatroomContext } from "../../utils/ChatroomContext";
import {UserContext} from "../../utils/UserContext";
import Message from "../Message";

function MessageWell() {
  const { conversation, participants, messages } = useContext(ChatroomContext);
  const {user} = useContext(UserContext);

  return (
    <Box>
      <Typography variant="h1">Message Well</Typography>
      {!conversation ? (
        "No conversation selected."
      ) : (
        <Box>
          {messages.map((message) => {
            const author = participants.filter(
              (user) => user._id == message.author
            )[0]
            return (
              <Message
                key={message._id}
                content={message.content}
                timeStamp = {message.timestamp}
                isSelf={author&&author._id === user._id}
                username={author?author.username:""}
                image = {author?author.image:""}
              ></Message>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default MessageWell;
