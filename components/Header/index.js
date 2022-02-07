import { useEffect, useState } from "react"
import { get } from 'axios'
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addManyWord, addWord } from "../../app/dictSlide"
import { showWordModel } from "../../app/wordModelSlide"


function Header() {
    const [searchWord, setSearchWord] = useState("")


    const wordsDict = useSelector((state) => state.dict.words)
    const dispatch = useDispatch()

    useEffect(() => {
        if (wordsDict.length == 0) {
            get('/api/user/word-list').then((res) => dispatch(addManyWord(res.data)))
        }
    }, [])

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
                    <Form className="d-flex" onSubmit={async (e) => {
                        e.preventDefault()

                        let wordData = wordsDict.find(word => word.word == searchWord)
                        if (!wordData) {
                            await get(`/api/user/${searchWord}`)
                                .then((res => {
                                    wordData = res.data
                                    dispatch(addWord(wordData))
                                }))
                                .catch(() => alert("word not found"))
                        }

                        if (wordData) {
                            dispatch(showWordModel(wordData))
                        }

                        setSearchWord("")
                    }}>
                        <Form.Control type="search" className="me-2" placeholder="Search Word"
                            value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                        <Button variant="outline-light" type="submit" formAction="">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>

        </Navbar >
    )
}

export default Header