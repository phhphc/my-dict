import { deleteUserWord, getWord } from "../../../database/database";

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        res.status(200).send(await deleteUserWord(req.query.word))
        
    } else if (req.method == 'GET') {
        const wordData = await getWord(req.query.word)

        if (wordData == null) {
            res.status(404).send()
        } else {
            res.status(200).send(wordData)
        }
    }
}