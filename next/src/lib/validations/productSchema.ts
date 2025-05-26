import { z } from 'zod';

export const productSchema = z.object({
    nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    quantidade: z.number().min(1, 'quantidade muito curta'),
    ativo: z.boolean(),
    descricao: z.string().min(10, 'Descrição muito curta'),

});

export type ProductFormData = z.infer<typeof productSchema>;