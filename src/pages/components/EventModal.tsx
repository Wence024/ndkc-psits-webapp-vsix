import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Event } from '../../types/Event';

interface EventModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  currentEvent: Event | null;
}

export const EventModal: React.FC<EventModalProps> = ({ show, onHide, onSubmit, currentEvent }) => {
  return (
    <Modal show={show} onHide={onHide} className="text-dark">
      <Modal.Header closeButton>
        <Modal.Title>{currentEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" required defaultValue={currentEvent?.title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" required defaultValue={currentEvent?.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" required defaultValue={currentEvent?.description} />
          </Form.Group>
          <Button type="submit" className="mt-3">Save</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};