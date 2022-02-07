import { get } from "axios"

const url = 'https://dictionary.cambridge.org/dictionary/english/'

const beginContentSign = '<div class="entry-body'
const beginElementSign = '<div class="pr entry-body__el'
const beginHeaderSign = '<div class="pos-header dpos-h'
const beginBodySign = '<div class="pr dsense'
const beginDefineSign = '<div class="def ddef_d db'
const beginPrononSign = '<span class="pron dpron'
const defineTypeSign = '<span class="pos dpos'


function getTagContent(str, beginSign) {
    const tagName = beginSign.split(/ |>|\//, 1)[0].slice(1)
    const endSign = '</' + tagName + '>'
    const middleSign = '<' + tagName

    let content = []
    let offset = 0
    while (true) {
        offset = str.indexOf(beginSign, offset)
        if (offset == -1) break

        let middle = offset + beginSign.length
        let end = offset
        while (true) {
            middle = str.indexOf(middleSign, middle)
            end = str.indexOf(endSign, end)

            if (middle == -1 || middle > end) break

            middle += middleSign.length
            end += endSign.length
        }

        content.push(str.slice(offset, end) + endSign)
        offset = end
    }

    return content
}

function getHeader(str) {
    return getTagContent(str, beginHeaderSign)
}

function getBody(str) {
    return getTagContent(str, beginBodySign)
}

function getPronon(str) {
    return getTagContent(str, beginPrononSign)
}

function getDefine(str) {
    return getTagContent(str, beginDefineSign)
}

function getType(str) {
    return getTagContent(str, defineTypeSign)
}

function dropTag(str) {
    return str.replace(/(<([^>]+)>)/ig, '').replace(/  /g, '')
}

function getMean(str) {
    let result = []
    const content = getTagContent(str, beginContentSign)
    if (content.length == 0) throw Error("Cannot get mean")
    const element_list = getTagContent(content[0], beginElementSign)
    for (let content of element_list) {
        let header = getHeader(content)[0]
        let body = getBody(content)[0]

        let pronon = getPronon(header).map(dropTag)
        let type = getType(header).map(dropTag)
        type = type.length > 0 ? type[0] : ""
        let define = getDefine(body).map(dropTag)

        result.push({ type, pronon, define })
    }

    return result
}

async function lookUp(word) {
    const res = await get(url + word)
    if (res.status == 200) {
        const mean = getMean(res.data)
        return { word: word, mean }
    }
    else {
        return null
    }
}

export default lookUp