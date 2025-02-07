import express, { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

const userValidationRules = [
  check('name').notEmpty().withMessage('O campo "name" é obrigatório.'),
  check('password').notEmpty().withMessage('O campo "password" é obrigatório.'),
  check('email').isEmail().withMessage('Forneça um endereço de email válido.'),
  check('phone').optional().isMobilePhone('pt-BR').withMessage('Forneça um número de telefone válido.'),
  check('age').optional().isInt({ min: 0 }).withMessage('A idade deve ser um número inteiro positivo.'),
  check('ethnicity').optional().isString().withMessage('O campo "ethnicity" deve ser uma string.')
];

router.post('/', userValidationRules, async (req: Request, res: Response): Promise<void> => {
    try {  
      const errors = validationResult(req);
      const { name, email, phone, age, ethnicity, password } = req.body as { name: string; email: string; phone: string; age: number; ethnicity: string; password: string; };

      if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const user = userRepository.create({ name, email, phone, age, ethnicity, password: hashedPassword });
      await userRepository.save(user);
      res.status(201).json(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário', details: error });
    }
  });
  
  router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await userRepository.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'Erro ao listar usuários', details: error });
    }
  });
  
  router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, email } = req.body as { name: string; email: string };
  
      if (!name || !email) {
        res.status(400).json({ error: 'Os campos "name" e "email" são obrigatórios.' });
        return;
      }
  
      const user = await userRepository.findOneBy({ id: Number(id) });
  
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return;
      }
  
      user.name = name;
      user.email = email;
  
      await userRepository.save(user);
      res.status(200).json(user);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário', details: error });
    }
  });

  router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params; 
  
      const user = await userRepository.findOneBy({ id: Number(id) });
  
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return;
      }
  
      await userRepository.remove(user);
      res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro ao deletar usuário', details: error });
    }
  });
  
  

export default router;
