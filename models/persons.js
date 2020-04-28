const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(resp => {
        console.log("Connected to MongoDB.");
    }).catch(err => {
        console.log(`Error occured while connecting to MongoDB: ${err.message}`);
    });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = doc._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});

console.log(personSchema.methods);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;