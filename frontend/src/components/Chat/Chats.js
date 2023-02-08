import { NavLink } from "react-router-dom";

const Chats = (props) => {
  return (
    <ul>
      {props.chats.map((chat) => (
        <li key={chat.id}>
          <NavLink to={"/chat/" + chat.id}>{chat.name}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Chats;
