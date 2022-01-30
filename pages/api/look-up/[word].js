import { getWord } from "../../../module/database";

export default async function handler(req, res) {
    const wordData = await getWord(req.query.word)

    if (wordData == null) {
        res.status(404).send()
    } else {
        res.status(200).send(wordData)
    }
}