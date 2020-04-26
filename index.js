const express = require("express");
const morgan = require("morgan");
const app = express()

// Create new morgan token
morgan.token("body", (req) => {
    return JSON.stringify(req.body);
});

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

let persons =  [
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "Max",
      "number": "322",
      "id": 5
    }
]

const validateName = (name) => {
    const person = persons.find(p => p.name === name);

    return !Boolean(person);
}

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(p => p.id === id);

    if (!person) {
        return res.status(404).end();
    }

    res.json(person);
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
    } else if (!validateName(body.name)) {
        return res.status(400).json({
            error: `${body.name} already exists in the database. Name must be unique`
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateRandomId()
    }

    persons = persons.concat(newPerson);

    res.json(newPerson);
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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listens  ${PORT}`);
});