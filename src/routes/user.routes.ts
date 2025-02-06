import express, { Request, Response, RequestHandler } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {  
      const { name, email, phone, age, ethnicity } = req.body as { name: string; email: string; phone: string; age: number; ethnicity: string; };
  
      if (!name || !email) {
        res.status(400).json({ error: 'Os campos "name" e "email" são obrigatórios.' });
        return;
      }
  
      const user = userRepository.create({ name, email, phone, age, ethnicity });
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
