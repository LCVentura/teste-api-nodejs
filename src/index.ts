import express from 'express';
import { AppDataSource } from './data-source';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import addressRoutes from './routes/address.router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/addresses', addressRoutes);

// Inicialização do banco de dados e do servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Conectado ao banco de dados');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));
