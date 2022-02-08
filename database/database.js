import clientPromise from "./mongodb"
import lookUp from "../lib/cambridge"

const WORD_COLLECTION = "word-list" // later replace with user-name

async function addUserWord(wordData) {
    const client = await clientPromise

    const collection = client.db().collection(WORD_COLLECTION)
    try {
        collection.updateOne({ word: wordData.word }, { $set: wordData }, { upsert: true })
        return true
    } catch {
        return false
    }
}

async function getUserWordList() {
    const client = await clientPromise

    const collection = client.db().collection(WORD_COLLECTION)
    const wordList = await collection.find(null, { projection: { _id: 0 } }).toArray()

    return wordList
}

async function deleteUserWord(wordName) {
    const client = await clientPromise

    const collection = client.db().collection(WORD_COLLECTION)
    const deletedCount = (await collection.deleteOne({ word: wordName })).deletedCount

    return deletedCount
}


export {
    addUserWord,
    getUserWordList,
    deleteUserWord,

}