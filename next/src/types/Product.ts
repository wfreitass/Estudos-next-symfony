export interface Product {
    id: string;
    nome: string;
    quantidade: number;
    ativo: boolean;
    descricao: string;

}

export type ProductCreate = Omit<Product, 'id'>;