import { ProductForm } from "@/components/products/productForm";


export default function CreateProductPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Novo Produto</h1>
      <ProductForm />
    </main>
  );
}