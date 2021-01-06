const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return 'Your notes...'
}

const addNote = (title, body) => {
  const notes = readFile()

  if (notes.some((note) => note.title == title)) {
    console.log(chalk.inverse.red('Title already exists'))
  } else {
    notes.push({
      title: title,
      body: body,
    })
    saveFile(notes)

    console.log(
      chalk.blue(`Title: ${title} Body: ${body} `),
      chalk.inverse.green(`Added successfully`)
    )
  }
}

const removeNote = (title) => {
  const notes = readFile()
  const filteredNotes = notes.filter((note) => note.title != title)

  if (JSON.stringify(notes) == JSON.stringify(filteredNotes)) {
    console.log(
      chalk.blue.bold.inverse(title),
      chalk.red.inverse('No such title exits in the notes')
    )
  } else {
    saveFile(filteredNotes)
    console.log(
      chalk.blue.bold.inverse(title),
      chalk.green.inverse('Note removed successfully')
    )
  }
}

const listNotes = () => {
  const notes = readFile()
  notes.forEach((note) => {
    console.log(chalk.inverse.white.bold(note.title), chalk.bold(note.body))
  })
}

const readNote = (title) => {
  const notes = readFile()
  const my_note = notes.find((note) => note.title == title)
  if (my_note) {
    console.log(chalk.inverse.white(my_note.title), chalk.white(my_note.body))
  } else {
    console.log(chalk.inverse.red.bold('No such title exits'))
  }
}

// ==================================
// helpers
// ==================================
function saveFile(notes) {
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('./notes.json', notesJSON)
}

function readFile() {
  try {
    const notesBuffer = fs.readFileSync('./notes.json')
    const noteJSON = notesBuffer.toString()
    return JSON.parse(noteJSON)
  } catch (e) {
    return []
  }
}

module.exports = { getNotes, addNote, removeNote, listNotes, readNote }
