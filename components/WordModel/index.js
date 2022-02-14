import { Modal, Button, Dropdown } from "react-bootstrap"
import { delete as axiosDelete, put as axiosPut } from "axios"
import { useDispatch, useSelector } from "react-redux"
import { removeWord } from "../../app/dictSlide"
import { hideWordModel } from "../../app/wordModelSlide"

function WordModal() {
    const dispatch = useDispatch()
    const { show, wordName, wordMean } = useSelector((state) => state.wordModel)

    function hideWordUntil(wordName, duration) {
        // close model, run in background
        dispatch(hideWordModel())

        axiosPut(`/api/user/${wordName}`, { hideTime: Date.now() + duration }).then((res) => {
            console.log("hide " + wordName + " " + res.data)

            // remove it from wordlist
            dispatch(removeWord(wordName))
        })
    }

    return (
        <Modal show={show} onHide={() => dispatch(hideWordModel())} centered size="xl" className="text-white">
            <Modal.Header closeButton className="bg-secondary">
                <Modal.Title>{wordName}</Modal.Title>
            </Modal.Header>

            {wordMean.map((mean, index) => (
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
                <Button variant="outline-danger" onClick={() => {
                    axiosDelete(`/api/user/${wordName}`).then((res) => {
                        console.debug("delete word " + wordName, "count " + res.data)

                        dispatch(removeWord(wordName))
                    })
                    dispatch(hideWordModel())
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </Button>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Hide until
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => hideWordUntil(wordName, 86400000)}>1 day</Dropdown.Item>
                        <Dropdown.Item onClick={() => hideWordUntil(wordName, 259200000)}>3 day</Dropdown.Item>
                        <Dropdown.Item onClick={() => hideWordUntil(wordName, 604800000)}>7 day</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Button variant="primary" onClick={() => {
                    dispatch(hideWordModel())
                }}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default WordModal