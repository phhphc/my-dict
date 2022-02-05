import { deleteUserWord } from "../../../module/database";

export default async function handler(req, res) {
    if (req.method == 'DELETE') {
        res.status(200).send(await deleteUserWord(req.query.word))
    }
}