import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchEvents();
  }, []);

  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    setUsers(userList);
  };

  const fetchEvents = async () => {
    const eventsCollection = collection(db, 'events');
    const eventSnapshot = await getDocs(eventsCollection);
    const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
    setEvents(eventList);
  };

  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const role = (form.elements.namedItem('role') as HTMLSelectElement).value as 'admin' | 'user';

    if (currentUser) {
      await updateDoc(doc(db, 'users', currentUser.id), { email, role });
    } else {
      await addDoc(collection(db, 'users'), { email, role });
    }

    setShowUserModal(false);
    fetchUsers();
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;

    if (currentEvent) {
      await updateDoc(doc(db, 'events', currentEvent.id), { title, date, description });
    } else {
      await addDoc(collection(db, 'events'), { title, date, description });
    }

    setShowEventModal(false);
    fetchEvents();
  };

  const deleteUser = async (userId: string) => {
    await deleteDoc(doc(db, 'users', userId));
    fetchUsers();
  };

  const deleteEvent = async (eventId: string) => {
    await deleteDoc(doc(db, 'events', eventId));
    fetchEvents();
  };

  const openSignupPage = () => {
    window.open('/signup', '_blank'); // Opens the signup page in a new tab
  };

  return (
    <Container className="py-5">
      <h1 className="h1 text-accent mb-4">Admin Dashboard</h1>
      
      <Row className="mb-5">
        <Col>
          <h2 className="h3 text-accent mb-3">Users</h2>
          <Button onClick={openSignupPage} className="mb-3">Add User</Button>
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
                    <Button variant="info" onClick={() => { setCurrentUser(user); setShowUserModal(true); }} className="me-2 mb-1">Edit</Button>
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2 className="h3 text-accent mb-3">Events</h2>
          <Button onClick={() => { setCurrentEvent(null); setShowEventModal(true); }} className="mb-3">Add Event</Button>
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
                    <Button variant="info" onClick={() => { setCurrentEvent(event); setShowEventModal(true); }} className="me-2 mb-1">Edit</Button>
                    <Button variant="danger" onClick={() => deleteEvent(event.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUserSubmit}>
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

      <Modal show={showEventModal} onHide={() => setShowEventModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentEvent ? 'Edit Event' : 'Add Event'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEventSubmit}>
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
    </Container>
  );
};

export default AdminDashboard;
