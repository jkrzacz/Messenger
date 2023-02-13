import { useHistory } from "react-router-dom";
import { List } from "semantic-ui-react";

const Chats = (props) => {
  const history = useHistory();

  const routeChange = (event) => {
    const path = `/chat/${event.currentTarget.id}`;
    history.push(path);
  };

  return (
    <List selection verticalAlign="middle">
      {props.chats.map((chat) => (
        <List.Item key={chat.id} id={chat.id} onClick={routeChange}>
          <List.Content>
            <List.Header style={{ fontSize: "22px", marginBottom: "5px" }}>
              {chat.name}
            </List.Header>
            <List.Description style={{ fontSize: "12px" }}>
              {`Created at: ${chat.create_datetime}`}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default Chats;
