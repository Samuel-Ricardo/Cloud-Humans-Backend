import express from 'express';
import cors from 'cors';
import routes from './routes';
import { globalErros } from './middlewares/errors/global_erros';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(globalErros);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
});
