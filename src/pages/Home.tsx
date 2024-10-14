import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Welcome to Our Club</h1>
          <Card>
            <Card.Body>
              <Card.Title>About Us</Card.Title>
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