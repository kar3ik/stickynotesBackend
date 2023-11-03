const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/dbconfig');
const authRouter = require('./Routes/authRouter');
const notesRouter = require('./Routes/notesRouter');
const cors = require('cors');


dotenv.config();

const app = express();
const PORT = 4001;

connectDB();

// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("hola backend");
});

app.use("/auth", authRouter);
app.use("/notes", notesRouter); // Mount the notesRouter under the /notes path

app.listen(process.env.PORT || PORT, () => {
    console.log("Server started...");
});
