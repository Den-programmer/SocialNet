import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Send, AccountCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { IMessagesContainer } from "./messagesContainer";
import Conversation from "./Dialog/Conversation/conversation";
import NoDialogs from "./Dialogs/Users/NoDialogs/noDialogs";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 800,
    display: "flex",
    flexDirection: "row",
    height: 500,
    borderRadius: 12,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
  },
  sidebar: {
    width: 250,
    borderRight: "1px solid #ccc",
    overflowY: "auto",
  },
  messagesContainer: {
    flexGrow: 1,
    overflowY: "auto",
    padding: 16,
    display: "flex",
    flexDirection: "column",
  },
  messageWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  botMessageWrapper: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  message: {
    padding: 8,
    borderRadius: 8,
    maxWidth: "75%",
    color: "white",
    display: "inline-block"
  },
  userMessage: {
    backgroundColor: "#1976d2",
    alignSelf: "flex-end",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #ccc",
    padding: 8,
  },
  input: {
    flexGrow: 1,
  },
  noDialogsContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  noMessages: {
    boxSizing: "border-box",
    padding: "10px 20px",
    fontSize: "20px",
    fontWeight: 500,
    fontFamily: 'Lato, sans-serif',
    fontStyle: "italic"
  }
}));

const MessagesPage: React.FC<IMessagesContainer> = ({ dialogsData, userDialogId, sendMessage, messages, setUserDialogId }) => {
  const classes = useStyles();

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const avatar = dialogsData.find((dialog) => dialog.id === userDialogId)?.photos.small || null;
  const Messages = messages.map((msg) => (
    <div
      key={msg.id}
      className={`${classes.messageWrapper} ${msg.sender === "user" ? classes.userMessageWrapper : classes.botMessageWrapper}`}
    >
      <Conversation key={msg.id} avatar={avatar} id={msg.id} messageText={msg.messageText}/>
    </div>
  ))

  const dialogs = dialogsData.map((dialog) => (
    <ListItem button key={dialog.id} onClick={() => setUserDialogId(dialog.id)}>
      <ListItemAvatar>
        <Avatar>
          {dialog.photos.small ? <img src={dialog.photos.small} alt="avatar" /> : <AccountCircle />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={dialog.userName} />
    </ListItem>
  ))

  return (
  <Card className={classes.root}>
    <div className={classes.sidebar}>
      <List>
        {dialogs.length > 0 ? dialogs : <div className={classes.noDialogsContainer}><NoDialogs /></div>}
      </List>
    </div>
    <CardContent className={classes.messagesContainer}>
      {messages.length > 0 ? Messages : <div className={classes.noMessages}>No messages</div>}
      <div ref={messagesEndRef} />
    </CardContent>
    <div className={classes.inputContainer}>
      <TextField
        className={classes.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        onKeyPress={(e) => e.key === "Enter" && sendMessage(userDialogId, input)}
      />
      <IconButton onClick={() => sendMessage(userDialogId, input)}>
        <Send />
      </IconButton>
    </div>
  </Card>
  );
}

export default MessagesPage