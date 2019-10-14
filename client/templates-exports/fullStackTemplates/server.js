let server = `const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use('/', express.static(path.resolve(__dirname, '../client/assets')));

// route to home page
app.get('/', (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/assets/index.html'));
});

// global route handler
app.use('*', (req, res) => {
  res.status(404).send('File not found');
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errObj = Object.assign(defaultErr, err);
  console.log(errObj.log);
  res.status(errObj.status).json(errObj.message);
});

// port listener
app.listen(PORT, () => {
  console.log("Listening on port, " + PORT);
}); `;

export default server;

