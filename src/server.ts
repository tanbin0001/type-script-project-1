import app from './app';
import config from './app/config';
import {Server} from 'http';

import mongoose from 'mongoose';



let server : Server ;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
   server =  app.listen(config.port, () => {
      console.log(` app listening on  ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}
main();
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected, shutting down sever😫`);
  if(server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1);
})

 process.on('uncaughtException', () => {
  process.exit(1)
 })