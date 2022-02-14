import { useEffect, useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Loading from "../Loading"
import { showWordModel } from "../../app/wordModelSlide"
import style from "./style.module.css"

function _FillWord() {
    // two mode fill word and fill mean
    const [fillWord, setFillWord] = useState(true)

    const [selectedWord, setSelectedWord] = useState()
    const [wordHint, setWordHint] = useState()
    const [previousFill, setPreviousFill] = useState()

    const [userFill, setUserFill] = useState("")

    const wordsDict = useSelector(state => state.dict.words)

    const dispatch = useDispatch()

    function randWord(wordsDict) {
        return wordsDict[Math.floor(Math.random() * wordsDict.length)]
    }

    function getAllMean(wordData) {
        return [].concat(...wordData.mean.map(mean => mean.define))
    }

    function randMean(wordData) {
        const meanList = getAllMean(wordData)
        return meanList[Math.floor(Math.random() * meanList.length)]
    }

    // use in fill mean mode, check if each word of user filled is in mean list  
    function filledInMean(wordData, filled) {
        const wordArr = getAllMean(wordData).join(" ").split(/ |:/)
        const fillArr = filled.split(/ |:|,|\./).filter(item => item != "")

        if (fillArr.length == 0) {
            return false
        }

        for (let fill of fillArr) {
            if (!wordArr.includes(fill)) return false
        }
        
        return true
    }

    function getFillWord() {
        const _word = randWord(wordsDict)
        const _hint = fillWord ? randMean(_word) : _word.word

        setSelectedWord(_word)
        setWordHint(_hint)
    }

    useEffect(() => {
        getFillWord()
    }, [fillWord])

    return (
        <Container className="border rounded-3 mt-5 shadow-lg text-white">

            <Row className={"text-center border-bottom fs-5 p-2 bg-secondary"} onClick={() => setFillWord(!fillWord)}>
                <div className="d-flex justify-content-between">
                    <div></div>
                    <div>{fillWord ? "Mean" : "Word"}</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className={fillWord ? "flip-animation transition" : "transition"} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                        </svg>
                    </div>
                    <div>{fillWord ? "Word" : "Mean"}</div>
                    <div></div>
                </div>
            </Row>


            <Row>
                <Col md className={`${style.myBorder} p-3`}>
                    {wordHint}
                </Col>
                <Col md className="p-3">
                    <textarea placeholder="..." value={userFill}
                        className={style.myTextarea}
                        onChange={(e) => {
                            setUserFill(e.target.value)

                            // change inputarea height
                            e.target.style.height = e.target.scrollHeight + "px"
                        }}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault()

                                // submit handler
                                setPreviousFill({
                                    hint: wordHint,
                                    answer: fillWord ? [selectedWord.word] : getAllMean(selectedWord),
                                    filled: e.target.value,
                                    word: selectedWord.word,
                                    mean: selectedWord.mean,
                                    correct: fillWord ?
                                        (selectedWord.word == e.target.value) : filledInMean(selectedWord, e.target.value)
                                })

                                setUserFill("")
                                e.target.style.height = ""
                                // set new word to fill
                                getFillWord()
                            }
                        }} />
                </Col>
            </Row>

            {previousFill &&
                <>
                    <Row className="border-top">
                        <Col md className={`${style.myBorder} p-3`}>
                            {previousFill.hint}
                        </Col>
                        <Col md className="p-3">
                            {previousFill.answer.map((item, index) => (
                                <div key={index}>{item}</div>
                            ))}
                        </Col>
                    </Row>
                    <Row className="border-top text-center">
                        <Col className={`p-3 ${previousFill.correct ? "text-success" : "text-warning"}`}>
                            <span className="px-2">{previousFill.filled || "..."}</span>
                            <span onClick={() => {
                                dispatch(showWordModel(previousFill))
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z" />
                                    <path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z" />
                                </svg>
                            </span>
                        </Col>
                    </Row>
                </>
            }
        </Container>
    )
}

export default function FillWord() {
    const wordDictLength = useSelector(state => state.dict.words.length)

    if (wordDictLength == 0) {
        return <Loading />
    } else {
        return <_FillWord />
    }
}