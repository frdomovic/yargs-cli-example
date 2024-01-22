#!/usr/bin/env node

const yargs = require("yargs");
const Phonebook = require("./models/Phonebook");

const phonebook = new Phonebook();

yargs.usage("\nUsage: $0 [cmd] <args>").alias("h", "help");

yargs
  .command(
    "add",
    "Add a contact",
    {
      name: {
        type: "string",
        demandOption: true,
        describe: "Contact name",
      },
      phone: {
        type: "string",
        describe: "Contact phone",
      },
    },
    function (argv) {
      phonebook.add(argv.name, argv.phone);
    }
  )
  .example("node $0 add --name='John Doe' --phone='0123456789'");

yargs
  .command(
    "search",
    "Search a contact",
    {
      name: {
        describe: "Contact name",
        type: "string",
        demandOption: true,
      },
    },
    function (argv) {
      console.log(phonebook.search(argv.name));
    }
  )
  .example("node $0 search --name='John Doe'");

yargs
  .command(
    "remove",
    "Remove a contact",
    {
      name: {
        describe: "Contact name",
        type: "string",
        demandOption: true,
      },
    },
    function (argv) {
      phonebook.remove(argv.name);
    }
  )
  .example("node $0 remove --name='John Doe'");

yargs
  .command("show", "Display all contacts", function () {
    phonebook.show();
  })
  .example("node $0 show");

console.log(yargs.argv);
