const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

class Phonebook {
  constructor() {
    this.path = path.join(__dirname, "..", "data");
    const parsedData = this.load();

    if (parsedData) {
      this.contacts = [...parsedData];
    } else {
      this.contacts = [];
    }
  }

  add(name, phone) {
    if (this.search(name)) {
      console.warn(chalk.yellow("User already exists"));
      return;
    }

    const newContact = {
      name: name,
      phone: phone,
    };

    this.contacts.push(newContact);
    console.log(chalk.green("Added: " + name));
    this.save();
  }

  remove(name) {
    if (this.search(name)) {
      const index = this.contacts.findIndex((contact, index) => {
        return contact.name === name;
      });

      this.contacts.splice(index, 1);
      console.log(chalk.green("Removed: " + name));
      this.save();
    } else {
      console.warn(chalk.yellow("This contact does not exist!"));
    }
  }

  search(name) {
    return this.contacts.find((contact) => contact.name === name);
  }

  save() {
    const JSONdata = JSON.stringify(this.contacts);
    fs.writeFileSync(`${this.path}/contacts.json`, JSONdata);
  }

  load() {
    const data = fs.readFileSync(`${this.path}/contacts.json`);
    return JSON.parse(data);
  }

  show() {
    if (this.contacts.length > 0) {
      this.contacts.map((contact) =>
        console.log(
          chalk.blue(`Name: ${contact.name}\nPhone:${contact.phone}\n`)
        )
      );
    } else {
      console.error(chalk.red("There is no user on this phonebook"));
    }
  }
}

module.exports = Phonebook;
