import { addUserWord } from "../../../database/database"

export default async function hander(req, res) {
    if (req.method == "POST") {

        res.status(200).send(await addUserWord(req.body))
    }

}