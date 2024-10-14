import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Dashboard</h1>
          <Card>
            <Card.Body>
              <Card.Title>Welcome, {user?.email}</Card.Title>
              <Card.Text>
                Role: {user?.role === 'admin' ? 'Admin' : 'User'}
              </Card.Text>
              {user?.role === 'admin' && (
                <Card.Text>
                  As an admin, you have access to additional features and management tools.
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;