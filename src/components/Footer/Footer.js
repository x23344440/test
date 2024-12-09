import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import {FaLinkedin, FaTwitter, FaInstagram} from "react-icons/fa";

import "./Footer.css";

export default function Footer(){
    let date = new Date();
    let year = date.getFullYear();

    return(
        <Container fluid className="footer">
            <Row>
                <Col md = "12" className="footer-copyright">
                    <h4>© {year}</h4>
                </Col>
            </Row>
            <Row>
                <Link to = "/"><h4>About</h4></Link>
            </Row>
            <Row>
                <Link to = "/contact"><h4>Contact Us</h4></Link>
            </Row>
            <Row>
                <Col md = "12" className="footer-body">
                    <div>
                    <button className="footer-icons" onClick={() => alert("LinkedIn Clicked")}><FaLinkedin/></button>
                    <button className="footer-icons" onClick={() => alert("Twitter Clicked")}><FaTwitter/></button>
                    <button className="footer-icons" onClick={() => alert("Instagram Clicked")}><FaInstagram/></button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
