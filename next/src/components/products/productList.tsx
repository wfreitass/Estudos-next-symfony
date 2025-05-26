"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Product } from "@/types/Product";
import { useProducts } from "@/Hooks/useProducts";



interface ProductListProps {
    products: Product[];
}

// export function ProductList({ products }: ProductListProps) {
export function ProductList() {
    const { listpProducts, loading, error } = useProducts();

    const [sorting, setSorting] = useState([]);

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "nome",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "quantidade",
            header: () => <span>Quantidade</span>,
            cell: ({ row }) => {
                const value = row.getValue("quantidade") as number;
                return <span> {value}</span>;
            },
        },
        {
            accessorKey: "ativo",
            header: () => <span>Ativo</span>,
            cell: ({ row }) => {
                const value = row.getValue("ativo") as number;
                return <span> {value ? "ativo" : "desativado"}</span>;
            },
        },
        {
            accessorKey: "descricao",
            header: () => <span>Descrição</span>,
            cell: ({ row }) => {
                const value = row.getValue("descricao") as string | undefined;
                return <span className="text-muted-foreground">{value || "—"}</span>;
            },
        },
    ];

    const table = useReactTable({
        data: listpProducts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
        onSortingChange: () => setSorting,
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center">
                                Nenhum produto encontrado.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}