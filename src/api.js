import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Register from './core/models';

const api = express();

api.use(cors());
api.use(helmet());

// Route to make heroku dyno alive again.
api.route('/wakeup').all((req, res) => {
  res
    .status(200)
    .send({ message: 'Owwwnnn... More 5min plz!' });
});

api.route('/registers').all(async (req, res) => {
  try {
    const registers = await Register.find();
    res.status(200).send({ data: registers });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

export default api;
