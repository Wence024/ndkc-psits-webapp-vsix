import React from 'react';
import { Table, Button } from 'react-bootstrap';

interface EventTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

export const EventTable: React.FC<EventTableProps> = ({ events, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>{event.date}</td>
            <td>{event.description}</td>
            <td>
              <Button variant="info" onClick={() => onEdit(event)} className="me-2">Edit</Button>
              <Button variant="danger" onClick={() => onDelete(event.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};