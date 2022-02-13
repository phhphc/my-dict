import { addUserWord } from "../../../database/database"


// add new word to user's word list
export default async function hander(req, res) {
    if (req.method == "POST") {
        res.status(200).send(await addUserWord(req.body))
    }

}