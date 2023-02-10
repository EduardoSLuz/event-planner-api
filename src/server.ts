// Adding App
import dotenv from 'dotenv';
import { App } from './app';

dotenv.config({ path: './config.env' });

// PORT DEFAULT IS 8000 OR CASE DON'T FIND IT WILL BE 3000
const port = process.env.PORT || 3000;

new App().server.listen(port, () => {
  console.log(`Api is running on localhost:${port}`);
});
