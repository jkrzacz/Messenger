import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import overridenStyles from "./ChatDetailsOverride.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  MessageInput,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataService from "../API/DataService";
import MessagesUtil from "./MessageUtil";

const ChatDetails = ({ readerIdNameMap, token, chatName }) => {
  // chat ID
  const { id } = useParams();
  // console.log(chats);
  const currentUserId = useSelector((state) => state.user.id);

  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    DataService.getMessages(token, id).then((res) => {
      const messageList = MessagesUtil.mapMessageResponse(
        res.data,
        readerIdNameMap,
        currentUserId
      );

      setMessages(messageList);
    });
  };

  const [time, setTime] = useState(Date.now());
  // Fetch messages every 2 seconds
  useEffect(() => {
    getMessages();

    const interval = setInterval(() => {
      getMessages();
      setTime(Date.now());
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSendMessage = (message) => {
    DataService.sendMessage(token, id, currentUserId, message).then((res) => {
      if (res.data) {
        setMessages((prev) => {
          const msg = MessagesUtil.mapSendMessageResponse(
            res.data,
            readerIdNameMap,
            currentUserId
          );
          return [...prev, msg];
        });
      }
    });
  };
  // console.log(id);
  // console.log(chatsIdNameMap);
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
            />
          </ChatContainer>
        </MainContainer>
        <div>
          Chatters: {Array.from(readerIdNameMap.values()).flat().join(", ")}
        </div>
      </div>
    </main>
  );
};

export default ChatDetails;
