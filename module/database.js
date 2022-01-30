import { MongoClient } from "mongodb"
import cambridge from "./cambridge.js"

const MESSAGE_ACCOUNT_EXIST = "Account exists"
const MESSAGE_ACCOUNT_ADDED = "Account added"

function DEBUG(...arg) { console.log(...arg) }
function LOG(type, functionName, ...arg) { console.log(type, functionName, Date().toString(), "\n", ...arg, "\n\n") }
const ERROR = "ERROR"
const DETAIL = "DETAIL"

const CORE_DATABASE = "my-dict"
const CLIENT_DATABASE = "client-dict"

const WORD_COLLECTION = "word-list"
const USER_COLLECTION = "users"

const uri = "mongodb+srv://mainguyenbinh32:F7MzcweQAdD6tJs@test.zi9ln.mongodb.net?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function addWord(word) {
    const collection = client.db(CORE_DATABASE).collection(WORD_COLLECTION)

    await collection.updateOne({ word: word.word }, { $set: word }, { upsert: true }).catch(err => {
        LOG(ERROR, "addWord", err)
    })
}

function getWord(wordName) {
    return new Promise((resolve, reject) => {


        client.connect(async err => {

            if (err) {
                LOG(ERROR, "client.connect", err)
                return -1
            }


            const collection = client.db(CORE_DATABASE).collection(WORD_COLLECTION)

            let word = await collection.findOne({ word: wordName }, { projection: { _id: 0 } })
            if (word == null) {
                try {
                    word = await cambridge(wordName)
                    //await collection.updateOne({ word: word.word }, { $set: word }, { upsert: true }).catch(err => {
                    //    LOG(ERROR, "addWord", err)
                    //})
                } catch (err) {
                    LOG(DETAIL, "cambridge lookup " + wordName, err)
                }
            }
            resolve(word)

            client.close()
        })
    })

}

async function addAccount(accountName, password) {
    const collection = client.db(CORE_DATABASE).collection(USER_COLLECTION)

    const exists = await collection.find({ account: accountName }).count()
    if (exists != 0) {
        return MESSAGE_ACCOUNT_EXIST
    }

    await collection.insertOne({ account: accountName, password: password })
    return MESSAGE_ACCOUNT_ADDED
}



export {
    getWord,
}