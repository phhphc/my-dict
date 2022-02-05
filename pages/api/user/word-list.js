import { getWordList } from "../../../module/database"

export default async function handler(req, res) {
    res.status(200).send(await getWordList())
}