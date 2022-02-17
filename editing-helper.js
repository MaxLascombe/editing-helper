const { MAX_SENTENCE_LENGTH } = require('./CONSTS.js')

const ARGS = process.argv

if (ARGS.length < 3) throw new Error('Missing arguments')

const FILE = ARGS[2]

const fs = require('fs')

fs.readFile(FILE, 'utf8', (err, data) => {
    if (err) return console.error(err)

    // remove new lines
    data = data.replace(/(\r\n|\n|\r)/gm, ' ')

    // remove double spaces
    data = data.replace(/\s\s+/g, ' ')

    const sentences = data.split('.')
    const sentenceLengths = sentences.map(
        (sentence) => sentence.trim().split(' ').length
    )

    const longAssSentences = sentenceLengths
        .map((l, i) => ({ s: sentences[i], l }))
        .filter((sl) => sl.l > MAX_SENTENCE_LENGTH)
    const sortedSentences = longAssSentences.sort((a, b) => b.l - a.l)
    sortedSentences.forEach(({ s, l }) =>
        console.log(`Sentence too long (${l} > ${MAX_SENTENCE_LENGTH}): ${s}.`)
    )
})
