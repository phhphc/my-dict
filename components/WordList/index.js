import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap"
import {get} from "axios"

function WordCard({word, mean, setShow, setModalWord}) {
    return (
        <Card bg="light" className="shadow h-100">
            <Card.Header className="d-flex justify-content-between">
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
                                <Col key={index}>{pronon}</Col>
                            ))}
                        </Row>
                    </Card.Title>

                    {mean.define.map((define, index) => (
                        <Card.Text key={index}>
                            {define}
                        </Card.Text>
                    ))}
                </Card.Body>
            ))}
        </Card>
    )
}

function WordModal({ show, setShow, word, mean }) {
    return (
        <Modal show={show} onHide={() => setShow(false)} centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{word}</Modal.Title>
            </Modal.Header>

            {mean.map((mean, index) => (
                <Modal.Body key={index}>
                    <div className="d-flex">
                        <div className="fw-bold">{mean.type}</div>
                        {mean.pronon.map((pronon, index) => (
                            <div key={index} className="word-pronon">{pronon}</div>
                        ))}

                    </div>

                    {mean.define.map((define, index) => (
                        <div key={index} className="word-define">
                            <span className="fw-bold">{index + 1}. </span>
                            {define}
                        </div>
                    ))}
                </Modal.Body>
            ))}

            <Modal.Footer>
                <Button variant="primary" onClick={() => console.log("ho")}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function WordList() {
    const [show, setShow] = useState(false)
    const [modalWord, setModalWord] = useState({ word: "", mean: [] })
    const [wordList, setWordList] = useState([])

    useEffect(()=>{
        get('/api/word-list').then((res)=>setWordList(res.data))
    }, [])

    return (
        <Container fluid className="p-5 text-center">
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