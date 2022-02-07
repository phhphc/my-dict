import clientPromise from "./mongodb"
import lookUp from "./cambridge"

const WORD_COLLECTION = "word-list" // later replace with user-name

async function getWord(wordName) {
    const client = await clientPromise
    
    const word = await lookUp(wordName)
    
    const collection = client.db().collection(WORD_COLLECTION)
    collection.updateOne({ word: word.word }, { $set: word }, { upsert: true }).catch(console.log)

    return word
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
    getWord,
    getUserWordList,
    deleteUserWord,

}