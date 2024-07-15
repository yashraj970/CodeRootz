import React, { useState, useEffect } from "react";
import axios from "axios";
import { Roles } from "../../config/constants";
import styles from "./UserManagement.module.css";
import { notifySuccess } from "../../utilities/toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(Roles);
      setRoles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleChange = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/${selectedUser._id}/role`, {
        roleId: selectedRole,
      });
      const updatedUsers = users.map((user) =>
        user._id === selectedUser._id ? response.data : user
      );
      notifySuccess("Role changed");
      setUsers(updatedUsers);
      setSelectedUser(null);
      setSelectedRole("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Management</h1>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id} className={styles.userItem}>
            {user.username} - {user.role?.name || "No role assigned"}
            <button
              onClick={() => {
                setSelectedUser(user);
                setSelectedRole(user.role?._id || "");
              }}
            >
              Assign Role
            </button>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className={styles.roleSection}>
          <h2>Assign Role to {selectedUser.username}</h2>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
          <button onClick={handleRoleChange}>Update Role</button>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
