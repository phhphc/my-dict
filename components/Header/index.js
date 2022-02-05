import { useState } from "react"
import { get } from 'axios'
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap"
import WordModal from "../WordModel"

function Header() {
    const [searchWord, setSearchWord] = useState("")
    const [show, setShow] = useState(false)
    const [modalWord, setModalWord] = useState({word: "", mean: []})


    return (
        <Navbar variant="dark" bg="success" fixed="top" expand="sm" className="shadow">
            <Container fluid>
                <Navbar.Brand href="#">MyDict</Navbar.Brand>
                <Navbar.Toggle type="button" />
                <Navbar.Collapse>
                    <Nav className="me-auto mb-2 mb-md-0" activeKey="/">
                        <Nav.Link href="/">Practice</Nav.Link>
                        <Nav.Link href="/learn">Learn</Nav.Link>
                        <Nav.Link href="/manage">Manage</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={(e) => {
                        e.preventDefault()
                        get(`/api/look-up/${searchWord}`)
                            .then(res => {
                                setModalWord(res.data)
                                setShow(true)
                            })
                            .catch(()=> alert("word not found"))
                        setSearchWord("")
                    }}>
                        <Form.Control type="search" className="me-2" placeholder="Search Word"
                            value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                        <Button variant="outline-light" type="submit" formAction="">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>

            <WordModal show={show} setShow={setShow} {...modalWord} />

        </Navbar>
    )
}

export default Header