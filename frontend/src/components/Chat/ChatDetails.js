import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import overridenStyles from "./ChatDetailsOverride.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { useEffect, useRef, useState } from "react";
import DataService from "../API/DataService";
import MessagesUtil from "./MessageUtil";

const ChatDetails = ({
  readerIdNameMap,
  token,
  chatName,
  currentUserId,
  chatId,
  readerIds,
}) => {
  const [messages, setMessages] = useState([]);
  const fileRef = useRef(null);
  const [base64String, setBase64String] = useState(null);
  const [fileName, setFileName] = useState(null);

  // Fetch messages every 2 seconds
  useEffect(() => {
    const getMessages = () => {
      DataService.getMessages(token, chatId).then((res) => {
        const messageList = MessagesUtil.mapMessageResponse(
          res.data,
          readerIdNameMap,
          currentUserId
        );

        setMessages(messageList);
      });
    };

    getMessages();

    const interval = setInterval(() => {
      getMessages();
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSendMessage = (message) => {
    DataService.sendMessage(token, chatId, currentUserId, message).then(
      (res) => {
        if (res.data) {
          setMessages((prev) => {
            const msg = MessagesUtil.mapSendMessageResponse(
              res.data,
              readerIdNameMap,
              currentUserId
            );
            return [...prev, msg];
          });

          if (base64String) {
            DataService.sendAttachment(
              token,
              res.data.id,
              base64String.split("base64,")[0],
              base64String
            );
          }

          setFileName(null);
          setBase64String(null);
        }
      }
    );
  };

  // funkcja obsługująca wybór pliku graficznego
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsDataURL(file);
    setFileName(file.name);
  };

  // funkcja obsługująca przetworzenie pliku graficznego
  const handleFileLoad = (event) => {
    const encodedString = event.target.result;
    setBase64String(encodedString);
  };

  return (
    <main>
      <div style={{ position: "relative", height: "800px" }}>
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Content userName={chatName} />
            </ConversationHeader>
            <MessageList>{messages}</MessageList>
            <MessageInput
              placeholder="Wprowadź swoją wiadomość"
              onSend={handleSendMessage}
              onAttachClick={() => fileRef.current.click()}
            ></MessageInput>
          </ChatContainer>
          <input
            type="file"
            id="file"
            onChange={handleFileSelect}
            ref={fileRef}
            style={{ display: "none" }}
          />
        </MainContainer>
        <div>
          Chatters: {readerIds.map((r) => readerIdNameMap.get(r)).join(", ")}
        </div>
        <div>Attached file: {fileName}</div>
        {fileName && (
          <img
            src={base64String}
            alt=""
            width={100}
            height={100}
            onClick={() => {
              setBase64String(null);
              setFileName(null);
            }}
          />
        )}
      </div>
    </main>
  );
};

export default ChatDetails;
