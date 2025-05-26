'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateProduct } from '@/Hooks/useCreateProduct';
import { ProductCreate } from '@/types/Product';


export const ProductForm = () => {
    const { mutate, isPending } = useCreateProduct();
    const { register, handleSubmit } = useForm<ProductCreate>();

    const onSubmit = (data: ProductCreate) => {
        mutate(data, {
            onSuccess: () => {
                alert("sucesso");
                // toast({
                //     title: 'Sucesso!',
                //     description: 'Produto criado com sucesso'
                // });
            },
            onError: (error) => {
                alert("falha");

                // toast({
                //     variant: 'destructive',
                //     title: 'Erro!',
                //     description: error.message
                // });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label htmlFor="name">Nome do Produto</Label>
                <Input {...register('nome')} required />
            </div>

            <Button type="submit" disabled={isPending}>
                {isPending ? 'Salvando...' : 'Criar Produto'}
            </Button>
        </form>
    );
};