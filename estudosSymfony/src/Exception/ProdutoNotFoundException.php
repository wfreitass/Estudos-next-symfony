<?php

namespace App\Exception;

class ProdutoNotFoundException extends \RuntimeException
{
    public function __construct(int $id)
    {
        parent::__construct("Produto with ID $id not found");
    }
}
