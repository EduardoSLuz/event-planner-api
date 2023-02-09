// Adding app
import { App } from './app';

// PORT DEFAULT IS 8000 OR CASE DON'T FIND IT WILL BE 3000
const port = 8000; //process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

new App().server.listen(port);
