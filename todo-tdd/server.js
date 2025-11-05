const app = require('./app');

const PORT = 3015;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});
