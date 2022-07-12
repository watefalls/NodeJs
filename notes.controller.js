const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  // const notes = require("./db.json");
  // const notes = Buffer.from(buffer).toString("utf-8");

  const notes = await getNotes();

  const note = {
    title: title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes: "));
  notes.forEach((note) => {
    console.log(chalk.green(note.id), chalk.blue(note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();
  const isEmptyId = notes.findIndex((note) => note.id === String(id));
  if (isEmptyId >= 0) {
    const newNotes = notes.filter((note) => note.id !== String(id));
    await fs.writeFile(notesPath, JSON.stringify(newNotes));
    printNotes();
  } else console.log(chalk.bgRed(`This id : ${id} not found from notes`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
