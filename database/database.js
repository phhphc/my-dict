import clientPromise from "./mongodb"

const WORD_COLLECTION = "word-list" // later replace with user-name

async function addUserWord(wordData) {
    const client = await clientPromise
    const collection = client.db().collection(WORD_COLLECTION)

    const res = await collection.updateOne({ word: wordData.word }, { $set: wordData }, { upsert: true })
    return res.modifiedCount + res.upsertedCount
}

async function getUserWordList() {
    const client = await clientPromise
    const collection = client.db().collection(WORD_COLLECTION)

    return (await collection.find(null, { projection: { _id: 0 } })).toArray()
}

async function deleteUserWord(wordName) {
    const client = await clientPromise
    const collection = client.db().collection(WORD_COLLECTION)

    return (await collection.deleteOne({ word: wordName })).deletedCount
}

async function setHideTime(wordName, time) {
    const client = await clientPromise

    const collection = client.db().collection(WORD_COLLECTION)
    return (await collection.updateOne({ word: wordName }, { $set: { hideTime: time } })).modifiedCount
}


export {
    addUserWord,
    getUserWordList,
    deleteUserWord,
    setHideTime,
}