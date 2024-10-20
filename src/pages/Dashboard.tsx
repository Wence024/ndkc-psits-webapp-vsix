import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
      setEvents(eventList);
    };

    fetchEvents();
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="h1 text-accent mb-4">Dashboard</h1>
          <Card className="bg-card text-card-foreground">
            <Card.Body>
              <Card.Title className="text-accent">Welcome, {user?.email}</Card.Title>
              <Card.Text>
                Role: {user?.role === 'admin' ? 'Admin' : 'User'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="h2 text-accent mb-3">Upcoming Events</h2>
          {events.map(event => (
            <Card key={event.id} className="mb-3 bg-card text-card-foreground">
              <Card.Body>
                <Card.Title className="text-accent">{event.title}</Card.Title>
                <Card.Subtitle className="mb-2">{event.date}</Card.Subtitle>
                <Card.Text>{event.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;