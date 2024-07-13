import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Roles } from "../../config/constants";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleMenus, setRoleMenus] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(Roles);
      setRoles(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRole = async () => {
    try {
      const response = await axios.post(Roles, {
        name: roleName,
        menus: roleMenus,
      });
      setRoles([...roles, response.data]);
      setRoleName("");
      setRoleMenus([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateRole = async () => {
    try {
      const response = await axios.put(`${Roles}/${selectedRole._id}`, {
        name: roleName,
        menus: roleMenus,
      });
      const updatedRoles = roles.map((role) =>
        role._id === selectedRole._id ? response.data : role
      );
      setRoles(updatedRoles);
      setSelectedRole(null);
      setRoleName("");
      setRoleMenus([]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`${Roles}/${roleId}`);
      setRoles(roles.filter((role) => role._id !== roleId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Role Management</h1>
      <input
        type="text"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        placeholder="Role Name"
      />
      <select
        multiple
        value={roleMenus}
        onChange={(e) =>
          setRoleMenus(
            [...e.target.selectedOptions].map((option) => option.value)
          )
        }
      >
        {/* Render menu options here */}
      </select>
      <Button
        variant="contained"
        onClick={selectedRole ? handleUpdateRole : handleCreateRole}
      >
        {selectedRole ? "Update Role" : "Create Role"}
      </Button>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            {role.name}
            <Button
              variant="contained"
              onClick={() => {
                setSelectedRole(role);
                setRoleName(role.name);
                setRoleMenus(role.menus);
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteRole(role._id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
