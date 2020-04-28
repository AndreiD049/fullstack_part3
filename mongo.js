const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Usage: node mongo.js <password> [<name>] [<number>]");
    process.exit(1);
}

const password = process.argv[2];
let name, number;

if (process.argv.length == 5) {
    name = process.argv[3];
    number = process.argv[4];
}

const url = `mongodb+srv://fullstack:${password}@cluster0-nxzao.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model("Person", personSchema);
if (name && number) {
    // name and person are set - we need to insert them in the database
    const addPerson = new Person({ name, number });

    addPerson.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to the database`);

        // close the database
        mongoose.connection.close();
    });
} else {
    // no name and person - list all the names in the phonebook to the console
    Person.find({}).then(result => {
        console.log("Phonebook:");
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });

        // close the database
        mongoose.connection.close();
    })
}