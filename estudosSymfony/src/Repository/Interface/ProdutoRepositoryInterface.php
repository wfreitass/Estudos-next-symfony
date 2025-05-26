<?php

namespace App\Repository\Interface;

use App\Entity\Produto;
use Doctrine\ORM\Tools\Pagination\Paginator;

interface ProdutoRepositoryInterface
{
    public function get(int $id): ?Produto;
    public function getAll(): Paginator;
    public function save(Produto $produto): void;
    public function delete(Produto $produto): void;
}
