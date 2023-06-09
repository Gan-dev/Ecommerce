import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {

    return (
        <div className="footer">
            <Container style={{ textAlign: "center", padding: 10 }}>
                <Row>
                    <Col>
                        <p>Developed by GanDev</p>
                    </Col>
                </Row>
            </Container>
        </div>

    )

}

export default Footer