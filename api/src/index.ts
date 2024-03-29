import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';
import http from 'node:http';
import { Server } from 'socket.io';


const app = express();
const port = 3001;
const server = http.createServer(app);

export const io = new Server(server);

io.emit('order@new');
mongoose.connect('mongodb://localhost:27017')
  .then(() => {


    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')));
    app.use(express.json());
    app.use(router);

    console.log('conectado ao mongo');

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

  })
  .catch((err) => console.log(`erro ao conectar ao mongodb ${err}`));



