import { deleteUserWord, setHideTime } from "../../../database/database";



export default async function handler(req, res) {

    // delete word from user's word list
    if (req.method == 'DELETE') {
        res.status(200).send(await deleteUserWord(req.query.word))
        
    }

    // set hide time for word
    if (req.method == 'PUT') {
        console.log(req.query.word, req.body)
        res.status(200).send(await setHideTime(req.query.word, req.body.hideTime))
    }
}