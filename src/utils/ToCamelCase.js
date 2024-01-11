export const toCamelCase = (string) => {
    const words = string.split(/\s+/g)

    const wordsCapFirstLetter = words.map((word, index) => {
        let capFirstLetter = word[0].toUpperCase()
        const rest = word.slice(1)
        if (index === 0) { capFirstLetter = word[0].toLowerCase() }
        return capFirstLetter + rest
    })

    return wordsCapFirstLetter.join('')
}