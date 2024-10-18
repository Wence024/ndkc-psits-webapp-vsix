import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4 text-primary">Welcome to Our Club</h1>
          <Card className="bg-card text-card-foreground">
            <Card.Body>
              <Card.Title className="text-primary">About Us</Card.Title>
              <Card.Text>
                We are a community of enthusiasts dedicated to sharing knowledge and experiences.
                Join us to connect with like-minded individuals and participate in exciting events!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;