import { getUserWordList } from "../../../lib/database"

export default async function handler(req, res) {
    res.status(200).send(await getUserWordList())
}