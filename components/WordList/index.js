import { Container, Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"
import WordCard from "./WordCard"

function WordList() {
    const wordsDict = useSelector(state => state.dict.words)

    return (
        <Container className="text-center">
            <Row>
                {wordsDict.map(wordData => (
                    <Col key={wordData.word} md="6" lg="4" className="p-2">
                        <WordCard {...wordData} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default WordList