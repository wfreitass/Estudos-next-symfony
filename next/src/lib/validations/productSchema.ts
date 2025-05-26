import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    description: z.string().min(10, 'Descrição muito curta'),
    price: z.coerce.number().positive('Preço deve ser positivo'),
    category: z.string().min(1, 'Selecione uma categoria'),
    imageUrl: z.string().url('URL inválida').optional()
});