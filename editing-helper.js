const { LONG_SENTENCE } = require('./CONSTS.js')

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
    sentences.forEach((sentence) => {
        sentence = sentence.trim()
        if (sentence.split(' ').length > LONG_SENTENCE)
            console.log(`Sentence too long: ${sentence}.`)
    })
})
