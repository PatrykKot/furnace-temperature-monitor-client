import uuid from "uuid/v1";
import loremIpsum from "lorem-ipsum";

export function mapRandom(min, max, call) {
    let result = []
    let count = randomRange(min, max)
    for (let i = 0; i < count; i++) {
        result.push(call())
    }

    return result
}

export function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomUuid() {
    return uuid()
}

export function randomWord() {
    let word = loremIpsum({
        count: 1,
        units: 'words'
    })

    word = word.toLowerCase()
    word = word.charAt(0).toUpperCase() + word.slice(1)

    return word
}