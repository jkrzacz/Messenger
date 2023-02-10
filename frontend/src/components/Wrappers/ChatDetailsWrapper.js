import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatDetails from "../Chat/ChatDetails";
import DataService from "../API/DataService";
import { useParams } from "react-router-dom";

const ChatDetailsWrapper = () => {
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

  const [allUsers, setAllUsers] = useState([]);
  const [readerIds, setReaderIds] = useState([]);
  const [readerIdNameMap, setReaderIdNameMap] = useState(null);

  const [chats, setChats] = useState([]);
  const [chatName, setChatName] = useState(null);

  useEffect(() => {
    DataService.getAllUsers(token).then((res) => {
      const users = res.data;
      setAllUsers(users);
    });

    DataService.getChatReaders(token, id).then((res) => {
      setReaderIds(res.data);
    });

    DataService.getChats(token).then((res) => {
      setChats(res.data);
    });
  }, [token, id]);

  useEffect(() => {
    if (!Array.isArray(allUsers) || !allUsers.length) {
      return;
    }

    if (!Array.isArray(readerIds) || !readerIds.length) {
      return;
    }

    if (!Array.isArray(chats) || !chats.length) {
      return;
    }
    console.log(readerIds);
    setReaderIdNameMap(new Map(allUsers.map((u) => [u.id, u.name])));
    setChatName(chats.filter((c) => +c.id === +id)[0].name);
  }, [allUsers, readerIds, chats, token, id]);

  if (readerIdNameMap && chatName != null) {
    return (
      <ChatDetails
        currentUserId={currentUserId}
        readerIdNameMap={readerIdNameMap}
        readerIds={readerIds}
        token={token}
        chatName={chatName}
        chatId={id}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ChatDetailsWrapper;
