import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Address } from '../entity/Address';
import { check, validationResult } from 'express-validator';
import { User } from '../entity/User';

const router = express.Router();
const addressRepository = AppDataSource.getRepository(Address);

const addressValidationRules = [
  check('user_id')
    .notEmpty().withMessage('O campo "user_id" é obrigatório.')
    .isInt().withMessage('O campo "user_id" deve ser um número inteiro.'),
  check('address')
    .notEmpty().withMessage('O campo "address" é obrigatório.'),
  check('number')
    .notEmpty().withMessage('O campo "number" é obrigatório.'),
  check('zip_code')
    .notEmpty().withMessage('O campo "zip_code" é obrigatório.'),
  check('city')
    .notEmpty().withMessage('O campo "city" é obrigatório.'),
  check('state')
    .notEmpty().withMessage('O campo "state" é obrigatório.')
    .isLength({ min: 2, max: 2 }).withMessage('O campo "state" deve ter 2 caracteres.')
];

router.post('/', addressValidationRules, async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { user_id, address, number, complement, zip_code, city, state } = req.body as { 
      user_id: number; 
      address: string; 
      number: string; 
      complement?: string; 
      zip_code: string; 
      city: string; 
      state: string;
    };

    const newAddress = addressRepository.create({ 
      user: { id: user_id } as User,
      address,
      number,
      complement,
      zip_code,
      city,
      state
    });
    await addressRepository.save(newAddress);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Erro ao criar endereço:', error);
    res.status(500).json({ error: 'Erro ao criar endereço', details: error });
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const addresses = await addressRepository.find({ relations: ['user'] });
    res.status(200).json(addresses);
  } catch (error) {
    console.error('Erro ao listar endereços:', error);
    res.status(500).json({ error: 'Erro ao listar endereços', details: error });
  }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { user_id, address, number, complement, zip_code, city, state } = req.body as { 
      user_id: number; 
      address: string; 
      number: string; 
      complement?: string; 
      zip_code: string; 
      city: string; 
      state: string;
    };

    if (!user_id || !address || !number || !zip_code || !city || !state) {
      res.status(400).json({ error: 'Campos obrigatórios não informados.' });
      return;
    }

    const existingAddress = await addressRepository.findOneBy({ id: Number(id) });
    if (!existingAddress) {
      res.status(404).json({ error: 'Endereço não encontrado.' });
      return;
    }

    existingAddress.user = { id: user_id } as User;
    existingAddress.address = address;
    existingAddress.number = number;
    existingAddress.complement = complement;
    existingAddress.zip_code = zip_code;
    existingAddress.city = city;
    existingAddress.state = state;

    await addressRepository.save(existingAddress);
    res.status(200).json(existingAddress);
  } catch (error) {
    console.error('Erro ao atualizar endereço:', error);
    res.status(500).json({ error: 'Erro ao atualizar endereço', details: error });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const existingAddress = await addressRepository.findOneBy({ id: Number(id) });
    if (!existingAddress) {
      res.status(404).json({ error: 'Endereço não encontrado.' });
      return;
    }

    await addressRepository.remove(existingAddress);
    res.status(200).json({ message: 'Endereço deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar endereço:', error);
    res.status(500).json({ error: 'Erro ao deletar endereço', details: error });
  }
});

export default router;
