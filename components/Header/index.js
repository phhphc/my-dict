import { Navbar, Container, Nav, Form, Button } from "react-bootstrap"

function Header() {
    return (
        <Navbar variant="dark" bg="success" fixed="top" expand="md" className="shadow">
            <Container fluid>
                <Navbar.Brand href="#">MyDict</Navbar.Brand>
                <Form className="d-flex d-md-none">
                    <Form.Control type="search" className="me-2" placeholder="Search Word" />
                    <Button variant="outline-light" type="submit" formAction="">Search</Button>
                </Form>
                <Navbar.Toggle type="button" />
                <Navbar.Collapse>
                    <Nav className="me-auto mb-2 mb-md-0" activeKey="/">
                        <Nav.Link href="/">Practice</Nav.Link>
                        <Nav.Link href="/learn">Learn</Nav.Link>
                        <Nav.Link href="/manage">Manage</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Form className="d-none d-md-flex">
                    <Form.Control type="search" className="me-2" placeholder="Search Word" />
                    <Button variant="outline-light" type="submit" formAction="">Search</Button>
                </Form>
            </Container>
        </Navbar>
    )
}

export default Header