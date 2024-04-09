const express = require('express');
const myapp = express();
const path = require('path');
const port = 12345;

// Serve static files from the root directory
myapp.use(express.static(path.join(__dirname, '/')));

// Route to serve the index.html file
myapp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

myapp.listen(port, () => {
	console.log('A server has started...');
    console.log(`Server running on http://127.0.0.1:${port}`);
});