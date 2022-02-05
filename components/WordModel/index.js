import { Modal, Button } from "react-bootstrap"
import axios from "axios"

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
                <Button variant="primary" onClick={() => {
                    axios.delete(`/api/user/${word}`).then((res) => {
                        if (res.data == 0) {
                            alert("Word not found")
                        } else {
                            alert(`${res.data} Word deleted`)
                        }
                    })
                }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default WordModal