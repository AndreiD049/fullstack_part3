require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express()
const Person = require("./models/persons");

// Create new morgan token
morgan.token("body", (req) => {
    return JSON.stringify(req.body);
});

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens["response-time"](req, res), 'ms',
        tokens["body"](req, res),
    ].join(' ');
}));

const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomId = () => {
    return randomInRange(1000000, 9999999);
}

const validateName = (name) => {
    const person = persons.find(p => p.name === name);

    return !Boolean(person);
}

app.get("/api/persons", (req, res) => {
    Person.find({}).then(results => {
        res.json(results);
    })
});

app.get("/api/persons/:id", (req, res) => {
    Person
        .findById(req.params.id)
            .then(person => {
                if (person === null) {
                    res.status(404).end();
                } else {
                    res.json(person);
                }
            }).catch(err => {
                console.log(`Error occured while fetching ${req.params.id} - ${err.message}`);
            })
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);

    persons = persons.filter(p => p.id !== id);

    res.status(204).end();
})

app.post("/api/persons", (req, res) => {
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "either 'name' or 'number' info is missing"
        });
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number,
    });

    newPerson.save().then(person => {
        res.json(newPerson);
    }).catch(err => {
        console.log(`Error adding new person ${body.name} - ${body.number} : ${err.message}`);
    })
})

app.get("/info", (req, res) => {
    const info = {
        info: `Phonebook has info for ${persons.length} people`,
        timestamp: new Date().toUTCString()
    }

    res.json(info);
});

app.use((req, res, next) => {
    res.status(404).json({
        error: "Unknown endpoint"
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listens  ${PORT}`);
});