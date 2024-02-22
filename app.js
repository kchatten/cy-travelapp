/* I'm not going to touch any of the files until I'm done with MongoDB learning on freeCodeCamp
so don't worry about this file it's just defaulted for localhost prototyping.*/

const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res)=> {
    res.render(`index.ejs`);
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})