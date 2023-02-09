import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import overridenStyles from "./ChatDetailsOverride.css";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatDetails = (props) => {
  // chat ID
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const currentUserId = useSelector((state) => state.user.id);
  const currentUsername = useSelector((state) => state.user.username);
  const [messages, setMessages] = useState([]);
  const [readerIds, setReaderIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [chatters, setChatters] = useState([]);

  const getMessages = () => {
    axios
      .get("http://localhost:8080/chat/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chat_id: id,
          take: 100,
          skip: 0,
        },
      })
      .then((res) => {
        console.log(allUsers);
        const messageList = res.data.map((msg) => {
          const sender = `${
            msg.user_id === currentUserId
              ? currentUsername
              : allUsers
                  .filter((u) => +u.id === +msg.user_id)
                  .map((u) => u.name)[0]
          }`;

          return (
            <Message
              key={msg.id}
              model={{
                message: msg.message,
                sentTime: msg.create_datetime,
                direction: msg.user_id === currentUserId ? 0 : 1,
              }}
            >
              <Message.Header
                style={{ display: "block !important" }}
                sender={sender}
                sentTime={`(${msg.create_datetime})`}
              />
              <Message.Footer
                style={{ display: "block !important" }}
                sender="wysłano"
              />
            </Message>
          );
        });

        setMessages(messageList);
      });
  };

  const getChatReaders = () => {
    axios
      .get("http://localhost:8080/chat/readers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chat_id: id,
        },
      })
      .then((res) => {
        const ids = res.data;
        setReaderIds(ids);
      });
  };

  const getUsers = () => {
    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const users = res.data;
        setAllUsers(users);
      });
  };

  const [time, setTime] = useState(Date.now());
  // Refresh messages every second
  useEffect(() => {
    getChatReaders();
    getUsers();
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
    const data = JSON.stringify({
      chat_id: id,
      user_id: currentUserId,
      message,
    });

    axios
      .post("http://localhost:8080/chat/message", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setMessages((prev) => {
            const msg = (
              <Message
                key={res.data.id}
                model={{
                  message: res.data.message,
                  sentTime: res.data.create_datetime,
                  direction: 0,
                }}
              ></Message>
            );

            return [...prev, msg];
          });
        }
      });
  };

  return (
    <main>
      <div style={{ position: "relative", height: "800px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>{messages}</MessageList>

            <MessageInput
              placeholder="Wprowadź swoją wiadomość"
              onSend={handleSendMessage}
            />
          </ChatContainer>
        </MainContainer>
        <div>
          Chatters:{" "}
          {allUsers
            .filter((u) => readerIds.includes(u.id))
            .map((u) => u.name)
            .join(", ")}
        </div>
      </div>
    </main>
  );
};

export default ChatDetails;
