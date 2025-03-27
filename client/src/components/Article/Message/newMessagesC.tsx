import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, TextField, IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { Send, AccountCircle, Collections } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { IMessagesContainer } from "./messagesContainer";
import Conversation from "../../common/Conversation/conversation";
import NoDialogs from "../../common/NoDialogs/noDialogs";

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
    position: "relative",
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
  },
  listItem: {
    backgroundColor: "#FFF"
  },
  activeListItem: {
    backgroundColor: "#F5F5F5"
  },
  fileInput: {
    opacity: 0,
    position: "absolute",
    width: 0,
    height: 0,
    overflow: "hidden",
  },
  fileInputContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 80,
    marginRight: 8,
    position: "absolute"
  },
  messageImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "25%",
  }
}));

const MessagesPage: React.FC<IMessagesContainer> = ({ dialogsData, userDialogId, sendMessage, messages, setUserDialogId, getALLDialogs }) => {
  const classes = useStyles();
  const fileInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getALLDialogs()
  }, [])

  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }


  useEffect(() => {
    handleFileChange(file);
  }, [file]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const Messages = messages.map((msg) => (
    <div
      key={msg._id}
      className={`${classes.messageWrapper} ${msg.sender === "user" ? classes.userMessageWrapper : classes.botMessageWrapper}`}
    >
      <Conversation key={msg._id} id={msg._id} messageText={msg.messageText} />
    </div>
  ))

  const dialogs = dialogsData.map((dialog) => {
    return <ListItem
      className={dialog._id === userDialogId ? classes.activeListItem : classes.listItem}
      button key={dialog.userName} onClick={() => setUserDialogId(dialog._id)}>
      <ListItemAvatar>
        <Avatar>
          {dialog.photos?.small ? <img src={dialog.photos?.small} alt="avatar" /> : <AccountCircle />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={dialog.userName} />
    </ListItem>
  })

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
        <div className={classes.fileInputContent}>
          <img className={classes.messageImage} src={imageUrl} alt="" /> {/* Payload too much */}
        </div>
        <TextField
          className={classes.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={file ? "":"Type a message..."}
          onKeyPress={(e) => e.key === "Enter" && sendMessage(userDialogId, input, imageUrl)}
        />

        <input accept="image/*" id="messageAsPictureFileInput" 
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        ref={fileInput} className={classes.fileInput} 
        type="file" />
        <label htmlFor="messageAsPictureFileInput">
          <IconButton component="span"> 
            <Collections />
          </IconButton>
        </label>
        <IconButton onClick={() => sendMessage(userDialogId, input, imageUrl)}>
          <Send />
        </IconButton>
      </div>
    </Card>
  );
}

export default MessagesPage