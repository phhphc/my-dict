import { Container, Row, Col } from "react-bootstrap"


function FillWord() {
    return (
        <Container fluid >
            <Row>
                <Col>1 of 2</Col>
                <Col md="auto">X</Col>
                <Col>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>
            <Row>
                <Col>1 of 2</Col>
                <Col>2 of 2</Col>
            </Row>

        </Container>
    )
}

export default FillWord