const express = require("express");
const app = express();

app.get('/', (req, res) => {
    res.send('express test')
});

const PORT = 3015;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
})