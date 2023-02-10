import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import Select from "react-select";
import DataService from "../API/DataService";
import classes from "./Chat.module.css";

const ChatCreator = (props) => {
  const token = useSelector((state) => state.user.token);
  const username = useSelector((state) => state.user.username);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    DataService.getAllUsers(token).then((res) => {
      const users = res.data.map((user) => ({
        label: user.name,
        value: user.id,
      }));
      setUsers(users);
    });
  }, [token]);

  return (
    <section className={classes.users}>
      {!props.enteredCreation && (
        <button onClick={props.cleanAfterCreation}>Create Chat</button>
      )}

      {props.enteredCreation && (
        <div>
          <h3>CREATING CHAT</h3>
          <form onSubmit={props.handleChatCreation}>
            <div className={classes.control}>
              <label htmlFor="chat_name">Chat name</label>
              <input
                type="text"
                id="chat_name"
                onChange={(e) => props.setChatName(e.target.value)}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="add_chatters">Add chatters</label>
              <Select
                isMulti
                className={classes.select}
                value={props.selected}
                options={users.filter((user) => user.label !== username)}
                onChange={props.setSelected}
              />
            </div>
            <button>Create</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ChatCreator;
