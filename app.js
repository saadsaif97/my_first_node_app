const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// add command
yargs.command({
  command: 'add',
  describe: 'to add the task',
  builder: {
    title: {
      describe: 'title of the task',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'body of the task',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  },
})

// remove command
yargs.command({
  command: 'remove',
  describe: 'to remove the task',
  builder: {
    title: {
      describe: 'remove the task',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    try {
      notes.removeNote(argv.title)
    } catch (e) {
      console.log(e)
    }
  },
})

// list command
yargs.command({
  command: 'list',
  describe: 'to list the task',
  handler: () => {
    notes.listNotes()
  },
})

// read command
yargs.command({
  command: 'read',
  describe: 'to read the task',
  builder: {
    title: {
      describe: 'Title to show',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    notes.readNote(argv.title)
  },
})

// add remove list read
yargs.parse()
