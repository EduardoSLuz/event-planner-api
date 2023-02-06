const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// PORT DEFAULT IS 8000 OR CASE DON'T FIND IT WILL BE 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
