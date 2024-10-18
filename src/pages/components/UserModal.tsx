import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface UserModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  currentUser: User | null;
}

export const UserModal: React.FC<UserModalProps> = ({ show, onHide, onSubmit, currentUser }) => {
  return (
    <Modal show={show} onHide={onHide} className="text-dark">
      <Modal.Header closeButton>
        <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" required defaultValue={currentUser?.email} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" name="role" required defaultValue={currentUser?.role}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="mt-3">Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};