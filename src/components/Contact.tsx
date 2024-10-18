import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import '../styles/Contact.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState<{ type: string; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    emailjs.init("EKWaVB39TyQnW84da");
    emailjs
      .send("service_h4d2drg", "template_anxl0dm", formData, "EKWaVB39TyQnW84da")
      .then((response) => {
        setShowAlert({ type: "success", message: "Message sent successfully!" });
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((error) => {
        setShowAlert({ type: "danger", message: "Failed to send message." });
        console.error("FAILED...", error);
      });

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <Container fluid className="contact-container">
      <Row className="justify-content-center">
        <h1 className="text-center">Contact Us</h1>
        <h2 className="subtitle text-center mb-4">We'd love to hear from you. Reach out to us below.</h2>
        <Col md={8} lg={6} className="contact-form-col">
          {showAlert && (
            <Alert variant={showAlert.type} onClose={() => setShowAlert(null)} dismissible>
              {showAlert.message}
            </Alert>
          )}
          <Form onSubmit={handleSubmit} className="contact-form bg-dark text-light p-4 rounded shadow-lg">
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Send Message
            </Button>
          </Form>
        </Col>
        <Col md={8} lg={6} className="map-col">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.98239104385!2d125.09300397399602!3d7.011353517303986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f8f91294f2f7c7%3A0xe8335b1d8c9ddffb!2sNotre%20Dame%20of%20Kidapawan%20College!5e0!3m2!1sen!2sph!4v1725788145939!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;