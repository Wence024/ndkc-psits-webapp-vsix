import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/About.css';
import President from "../images/Pres.jpg";
import VicePresident from "../images/VPres.jpg";
import Secretary from "../images/Sec.jpg";
import Treasurer from "../images/Treas.jpg";
import Auditor from "../images/Auditor.jpg";
import PIO from "../images/PIO.jpg";
import BSMngr1 from "../images/BSMngr1.jpg";
import BSMngr2 from "../images/BSMngr2.jpg";
import RepCS4th from "../images/4thRepCS.jpg";
import RepIT4th from "../images/4thRepIT.jpg";
import RepCS3rd from "../images/3rdRepCS.jpg";
import RepIT3rd from "../images/3rdRepIT.jpg";
import RepCS2nd from "../images/2ndRepCS.jpg";
import RepIT2nd from "../images/2ndRepIT.jpg";

const About: React.FC = () => {
  const teamMembers = [
    { img: President, name: "Kent Oliver Cartagena", position: "President" },
    { img: VicePresident, name: "Marian Policar", position: "Vice President" },
    { img: Secretary, name: "Janno Into", position: "Secretary" },
    { img: Treasurer, name: "Dean Lauren Dadivas", position: "Treasurer" },
    { img: Auditor, name: "Paul Andre Cardeño", position: "Auditor" },
    { img: PIO, name: "Xcylly Campo", position: "PIO" },
    { img: BSMngr1, name: "Mark Irish Ambrosio", position: "Business Manager" },
    { img: BSMngr2, name: "Ludwig Razon", position: "Business Manager" },
    { img: RepCS4th, name: "Jericho Joshua Reynes", position: "4th Year CS Representative" },
    { img: RepIT4th, name: "Yohadza Ulangkaya", position: "4th Year IT Representative" },
    { img: RepCS3rd, name: "John Marc Alvarez", position: "3rd Year CS Representative" },
    { img: RepIT3rd, name: "Gabriel Aguilar", position: "3rd Year IT Representative" },
    { img: RepCS2nd, name: "Alex Carbonell", position: "2nd Year CS Representative" },
    { img: RepIT2nd, name: "Darrel Jay Lahoylahoy", position: "2nd Year IT Representative" },
  ];

  return (
    <Container fluid className="about-container">
      <Col className="text-center">
        <h2 className="text-light">About Our Club</h2>
        <p className="subtitle mb-5">Discover our mission and the people behind our success.</p>
      </Col>
      <section className="statement-of-purpose text-center">
        <h3>Our Purpose</h3>
        <p>
          Our club is dedicated to fostering a community of learners and
          innovators in the field of Information Technology. We aim to provide
          opportunities for skill development, collaboration, and leadership
          through workshops, competitions, and community outreach. Our purpose
          is to empower members to achieve their potential and contribute
          meaningfully to the tech industry and society.
        </p>
      </section>

      <section className="our-team-section">
        <h3 className="text-center">Meet Our Team</h3>
        <Row className="our-team">
          {teamMembers.map((member, index) => (
            <Col md={3} key={index} className="team-card-wrapper">
              <Card className="team-card bg-dark text-light border-0 shadow-lg">
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={`${member.name}`}
                  className="team-img"
                />
                <Card.Body className="text-center">
                  <Card.Title className="team-name">{member.name}</Card.Title>
                  <Card.Text className="team-position">
                    {member.position}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}

export default About;