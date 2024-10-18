import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { User } from '../../types/User';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button variant="info" onClick={() => onEdit(user)} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => onDelete(user.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};