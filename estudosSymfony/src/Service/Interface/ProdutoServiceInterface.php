<?php

namespace App\Service\Interface;

use App\Dto\Input\ProdutoInputDto;
use App\Entity\Produto;
use Doctrine\ORM\Tools\Pagination\Paginator;

interface ProdutoServiceInterface
{
    public function createProduto(ProdutoInputDto $data): Produto;
    public function updateProduto(int $id, ProdutoInputDto $data): Produto;
    public function deleteProduto(int $id): void;
    public function getProduto(int $id): Produto;
    public function getAllProdutos(): array;
}
