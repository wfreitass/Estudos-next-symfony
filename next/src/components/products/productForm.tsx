"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const productSchema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    description: z.string().optional(),
    price: z.coerce.number().positive("Preço deve ser maior que 0"),
    stock: z.coerce.number().int().nonnegative("Estoque deve ser 0 ou mais"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
    onSubmit: (data: ProductFormData) => void;
    isLoading?: boolean;
}

export function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
            <div>
                <Label htmlFor="name">Nome</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" {...register("description")} />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
            </div>

            <div>
                <Label htmlFor="price">Preço (R$)</Label>
                <Input id="price" type="number" step="0.01" {...register("price")} />
                {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>

            <div>
                <Label htmlFor="stock">Estoque</Label>
                <Input id="stock" type="number" {...register("stock")} />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Produto"}
            </Button>
        </form>
    );
}