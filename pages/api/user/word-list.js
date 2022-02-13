import { getUserWordList } from "../../../database/database"


// get user's word list
export default async function handler(req, res) {
    res.status(200).send(await getUserWordList())
}