let server = `const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = 8080;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../assets.index.html'))
})

app.listen(PORT, () => {
  console.log('listening on port 8080')
})`;

export default server;

