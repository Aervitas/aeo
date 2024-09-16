import { config } from 'dotenv';

//import { executeUserCrudOperations } from './usersCrud.js';
import http from 'http';
config();



import { app } from '../middleware/app.js';

config();
const port = process.env.PORT || 3001

const server = http.createServer(app);

server.listen(port)



//await executeUserCrudOperations();