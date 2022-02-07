import { Modal, Button } from "react-bootstrap"
import { delete as axiosDelete } from "axios"
import { useDispatch } from "react-redux"
import { removeWord } from "../../app/dictSlide"

function WordModal({ show, setShow, word, mean }) {
    const dispatch = useDispatch()

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
                <Button variant="primary" onClick={() => {
                    axiosDelete(`/api/user/${word}`).then((res) => {
                        dispatch(removeWord(word))
                    })
                    setShow(false)
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default WordModal