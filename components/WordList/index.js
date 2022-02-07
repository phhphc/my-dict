import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import WordModal from "../WordModel"
import WordCard from "./WordCard"


function WordList() {
    const [show, setShow] = useState(false)
    const [modalWord, setModalWord] = useState({ word: "", mean: [] })

    const wordsDict = useSelector(state => state.dict.words)

    return (
        <Container fluid className="p-5 text-center">
            <Row>
                {wordsDict.map(wordData => (
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