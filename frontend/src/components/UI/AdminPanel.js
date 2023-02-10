import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Image, List } from "semantic-ui-react";
import DataService from "../API/DataService";

const AdminPanel = () => {
  const [allUsers, setAllUsers] = useState([]);
  const token = useSelector((state) => state.user.token);
  const currentUserId = useSelector((state) => state.user.id);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const giveAdminRights = (event) => {
    const targetId = event.currentTarget.name;

    DataService.changeAdmin(token, +targetId, true).then((res) =>
      setRefreshFlag((prev) => !prev)
    );
  };

  const removeAdminRights = (event) => {
    const targetId = event.currentTarget.name;

    DataService.changeAdmin(token, +targetId, false).then((res) =>
      setRefreshFlag((prev) => !prev)
    );
  };

  const deleteUser = (event) => {
    const targetId = event.currentTarget.name;

    DataService.deleteUser(token, +targetId).then((res) =>
      setRefreshFlag((prev) => !prev)
    );
  };

  useEffect(() => {
    setRefreshFlag((prev) => !prev);
  }, []);

  useEffect(() => {
    DataService.getAllUsers(token).then((res) => {
      const users = res.data;
      setAllUsers(users);
    });
  }, [refreshFlag, token]);

  if (!Array.isArray(allUsers) || !allUsers.length) {
    return <div>Loading...</div>;
  }

  return (
    <List divided verticalAlign="middle" style={{ marginTop: "1%" }}>
      {allUsers
        .filter((user) => user.id !== currentUserId)
        .map((user) => {
          return (
            <List.Item key={user.id}>
              <List.Content floated="right">
                {!user.is_admin && (
                  <Button name={user.id} onClick={giveAdminRights}>
                    Give admin rights
                  </Button>
                )}
                {user.is_admin && (
                  <Button name={user.id} onClick={removeAdminRights}>
                    Remove admin rights
                  </Button>
                )}
                <Button name={user.id} onClick={deleteUser}>
                  Delete User
                </Button>
              </List.Content>
              <Image
                avatar
                src={!user.is_admin ? "./person-icon.png" : "./admin-icon.png"}
              />
              <List.Content>{user.name}</List.Content>
            </List.Item>
          );
        })}
    </List>
  );
};

export default AdminPanel;
