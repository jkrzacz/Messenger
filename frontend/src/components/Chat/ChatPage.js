import { useSelector } from "react-redux";
import ChatCreator from "./ChatCreator";
import Chats from "./Chats";
import axios from "axios";
import { useState, useEffect } from "react";

import "semantic-ui-css/semantic.min.css";

const ChatPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user.token);
  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState("");
  const [selected, setSelected] = useState(null);
  const [enteredCreation, setEnteredCreation] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/chats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setChats(res.data);
      });
  }, [token]);

  const handleCreation = (event) => {
    event.preventDefault();
    const data = JSON.stringify({ name: chatName });

    axios
      .post("http://localhost:8080/chat", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setSelected([]);
          setEnteredCreation(false);
          setChats((prev) => {
            return [...prev, res.data];
          });
        }

        if (Array.isArray(selected) && selected.length) {
          const chatId = res.data.id;

          selected.forEach((obj) => {
            const data = JSON.stringify({
              chat_id: chatId,
              user_id: obj.value,
            });

            axios.post("http://localhost:8080/chat/reader", data, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
          });
        }
      });
  };

  const cleanAfterCreation = () => {
    setEnteredCreation(!enteredCreation);
  };

  return (
    <main>
      {isLoggedIn && (
        <>
          <ChatCreator
            setChatName={setChatName}
            handleChatCreation={handleCreation}
            selected={selected}
            setSelected={setSelected}
            enteredCreation={enteredCreation}
            setEnteredCreation={setEnteredCreation}
            cleanAfterCreation={cleanAfterCreation}
          />

          <Chats chats={chats} />
        </>
      )}
    </main>
  );
};

export default ChatPage;
