import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap"
import { get } from "axios"
import WordModal from "../WordModel"

function WordCard({ word, mean, setShow, setModalWord }) {
    return (
        <Card bg="light" className="shadow h-100 border-warning">
            <Card.Header className="d-flex justify-content-between bg-warning">
                <div></div>
                <div>{word}</div>
                <div onClick={() => {
                    setShow(true)
                    setModalWord({ word, mean })
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        viewBox="0 0 16 16" className="hover-btn" >
                        <path fillRule="evenodd"
                            d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z" />
                    </svg>
                </div>
            </Card.Header>

            {mean.map(mean => (
                <Card.Body key={mean.type}>
                    <Card.Title className="fs-6">
                        <Row>
                            <Col className="fw-bold">{mean.type}</Col>
                            {mean.pronon.map((pronon, index) => (
                                <Col className="word-pronon" key={index}>{pronon}</Col>
                            ))}
                        </Row>
                    </Card.Title>

                    {mean.define.map((define, index) => (
                        <Card.Text className="word-define" key={index}>
                            {define}
                        </Card.Text>
                    ))}
                </Card.Body>
            ))}
        </Card>
    )
}

function WordList() {
    const [show, setShow] = useState(false)
    const [modalWord, setModalWord] = useState({ word: "", mean: [] })
    const [wordList, setWordList] = useState([])

    useEffect(() => {
        get('/api/user/word-list').then((res) => setWordList(res.data))
    }, [])

    return (
        <Container fluid className="p-5 text-center">
            <Button variant="outline-success" onClick={() => {
                get('/api/user/word-list').then((res) => setWordList(res.data))
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                    <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                </svg>
            </Button>

            <Row>
                {wordList.map(wordData => (
                    <Col key={wordData.word} md="6" lg="4" className="p-2">
                        <WordCard {...wordData} setShow={setShow} setModalWord={setModalWord} />
                    </Col>
                ))}

                <WordModal show={show} setShow={setShow} {...modalWord} />

            </Row>
        </Container>
    )
}

export default WordList