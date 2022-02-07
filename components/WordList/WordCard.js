import { Card, Row, Col } from "react-bootstrap"
import { showWordModel } from "../../app/wordModelSlide"
import { useDispatch } from "react-redux"

function WordCard({ word, mean }) {
    const dispatch = useDispatch()

    return (
        <Card bg="light" className="shadow h-100 border-warning">
            <Card.Header className="d-flex justify-content-between bg-warning">
                <div></div>
                <div>{word}</div>
                <div onClick={() => {
                    dispatch(showWordModel({ word, mean }))
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

export default WordCard