import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import "../styles/Topics.css";
import Image1 from "../images/Topics-img1.jpg";
import Image2 from "../images/Topics-img2.jpg";
import Image3 from "../images/Topics-img3.jpg";

interface Topic {
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
}

const topics: Topic[] = [
  {
    title: "Workshops and Trainings",
    shortDescription: "Explore various workshops and training sessions to enhance your skills.",
    longDescription: "Dive into a range of workshops and training sessions designed to boost your skills and knowledge. Whether you're looking to master a new technology, refine your professional abilities, or explore a new field, these interactive sessions offer hands-on learning experiences. Benefit from expert guidance and practical exercises tailored to help you achieve your personal and career goals.",
    image: Image1,
  },
  {
    title: "Hackathons and Competitions",
    shortDescription: "Participate in hackathons and competitions to challenge yourself and win prizes.",
    longDescription: "Get involved in hackathons and competitions to push your creative and technical limits while working on real-world problems. These events provide a dynamic platform to collaborate with peers, innovate, and showcase your talents. Plus, you'll have the opportunity to win exciting prizes and gain recognition for your efforts.",
    image: Image2,
  },
  {
    title: "Community Outreach",
    shortDescription: "Engage in community outreach programs to give back and make a difference",
    longDescription: "Participate in community outreach programs to actively contribute to the well-being of your local area and beyond. These initiatives offer a chance to volunteer your time and skills, make meaningful connections, and address important social issues. By engaging in outreach, you not only help others but also enrich your own life with rewarding experiences.",
    image: Image3,
  },
];

const Topics: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<Topic | null>(null);

  const handleShowModal = (content: Topic) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container fluid className="topics-container">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="text-light">Club Topics</h1>
          <h2 className="subtitle">Explore our diverse range of topics and events.</h2>
        </Col>
      </Row>
      <Row>
        {topics.map((topic, index) => (
          <Col xs={12} md={6} lg={4} className="mb-4" key={index}>
            <Card className="bg-dark text-light border-light topic-card">
              <Card.Img variant="top" src={topic.image} className="card-img" />
              <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>{topic.shortDescription}</Card.Text>
                <Button
                  variant="primary"
                  className="btn-primary"
                  onClick={() => handleShowModal(topic)}
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} className="custom-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>{modalContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {modalContent && (
            <>
              <img
                src={modalContent.image}
                alt={modalContent.title}
                className="modal-img img-fluid mb-3"
              />
              <p>{modalContent.longDescription}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="primary" onClick={handleCloseModal} className="btn-primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Topics;