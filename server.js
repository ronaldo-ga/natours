const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.error(err.name, err.message);
  console.log('► ► ► ► ► Shutting Down after Error ! ◄ ◄ ◄ ◄ ◄');

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB Connected'));

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(3000, () => {
  console.log(`App Running of port ${port}`);
});

process.on('unhandledRejection', err => {
  console.error(err.name, err.message);
  console.log('► ► ► ► ► Shutting Down after Error ! ◄ ◄ ◄ ◄ ◄');
  server.close(() => {
    process.exit(1);
  });
});
