const notepad = [
  { title: "note1", description: "descr1", id: 1 },
  { title: "note2", description: "descr2", id: 2 },
  { title: "note3", description: "descr3", id: 3 },
  { title: "note4", description: "descr4", id: 4 },
  { title: "note5", description: "descr5", id: 5 }
];

const title = {
  title: "sometitle"
};
// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  notepad,
  title
};
