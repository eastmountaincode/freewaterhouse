console.log('top of server page');
const express = require('express');
const app = express();
const port = 3001;
var path = require('path');

app.get('/dummy_node', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dummy.html'));
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Dummynode listening at http://localhost:${port}`);
});
