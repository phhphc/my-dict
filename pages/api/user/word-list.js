import { getUserWordList } from "../../../database/database"

export default async function handler(req, res) {
    res.status(200).send(await getUserWordList())
}