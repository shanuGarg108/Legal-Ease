const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/verify', (req, res) => {
  const { phoneNo, firstLetterName, dobDate, dobMonth, dobYear } = req.body;
  
  exec(`python verify.py ${phoneNo} ${firstLetterName} ${dobDate} ${dobMonth} ${dobYear}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send('Verification failed');
      return;
    }
    res.send(stdout);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});