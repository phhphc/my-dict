import { useEffect, useState } from "react"
import { get, post } from 'axios'
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { addManyWord, addWord } from "../../app/dictSlide"
import { showWordModel } from "../../app/wordModelSlide"
import lookUp from "../../lib/cambridge"
import Link from "next/link"
import { useRouter } from "next/router"

function Header() {
    const [searchWord, setSearchWord] = useState("")
    const [searching, setSearching] = useState(false)


    const wordsDict = useSelector((state) => state.dict.words)
    const dispatch = useDispatch()

    const router = useRouter()

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
                    <Nav className="me-auto mb-2 mb-md-0" defaultActiveKey={router.pathname}>
                        <Link href="/">
                            <Nav.Link href="/">
                                Practice
                            </Nav.Link>
                        </Link>
                        <Link href="/learn">
                            <Nav.Link href="/learn">
                                Learn
                            </Nav.Link>
                        </Link>
                        <Link href="/manage">
                            <Nav.Link href="/manage">
                                Manage
                            </Nav.Link>
                        </Link>
                        <Link href="/account">
                            <Nav.Link href="/account">
                                Account
                            </Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={async (e) => {
                        setSearching(true)
                        e.preventDefault()

                        let wordData = wordsDict.find(item => item.word == searchWord)
                        if (!wordData) {
                            wordData = await lookUp(searchWord)

                            if (wordData) {
                                // save word to database
                                post("/api/user/", wordData)
                                // save word to client browser
                                dispatch(addWord(wordData))
                            }
                        }
                        setSearchWord("")
                        setSearching(false)

                        if (wordData) {
                            // display word
                            dispatch(showWordModel(wordData))
                        } else {
                            alert("word not found")
                        }

                    }}>
                        <Form.Control type="search" className="me-2" placeholder="Search Word"
                            value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
                        <Button variant="outline-light" type="submit" formAction="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                viewBox="0 0 16 16" className={searching ? "spin-animation" : ""}>
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header