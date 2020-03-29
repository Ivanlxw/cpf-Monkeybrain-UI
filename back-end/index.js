const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser")
const initialRun = require("./personaliser/personaliser-test").initialRun
const trainer = require("./personaliser/personaliser-test").trainer
const config = {
    express: {
        portNumber: 3001
    }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// allow cross origin requests
app.use(cors({ origin: true, credentials: true }));

/** Dummy handler for sorting the services */
const dummyReccomender = (req, res) => {
    const { name } = req.body
    const data = name.toUpperCase() 
    res.json({
        data
    })
}

/** Azure Endpoints */
app.get("/azure/serviceReccomender/initial", initialRun)

app.post("/azure/serviceReccomender/trainer", trainer)

const startExpress = (portNumber) => app.listen(portNumber)

startExpress(config.express.portNumber)
console.log(`Server started at ${config.express.portNumber}!`)
