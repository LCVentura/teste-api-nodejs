import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const router = Router();
const userRepository = AppDataSource.getRepository(User);

// Registro de usuário
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, phone, age, ethnicity } = req.body;
  
    try {
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'Email já está em uso.' });
        return;
      }
  
      const user = userRepository.create({ name, email, password, phone, age, ethnicity });
      await userRepository.save(user);
      res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao registrar usuário.', error });
    }
  });
  
  // Login de usuário
  router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        res.status(400).json({ message: 'Credenciais inválidas.' });
        return;
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Credenciais inválidas.' });
        return;
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao fazer login.', error });
    }
  });
  

export default router;
