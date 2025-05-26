<?php

namespace App\Dto\Output;

use App\Entity\Produto;
use Symfony\Component\Serializer\Annotation\Groups;

class ProdutoOutputDto
{
    public function __construct(
        #[Groups(['api'])]
        public int $id,

        #[Groups(['api'])]
        public string $nome,

        #[Groups(['api'])]
        public float $ativo,

        #[Groups(['api'])]
        public ?int $quantidade,

        #[Groups(['api'])]
        public ?string $descricao = null,

    ) {}

    public static function fromEntity(Produto $produto): self
    {
        return new self(
            $produto->getId(),
            $produto->getNome(),
            $produto->isAtivo(),
            $produto->getQuantidade(),
            $produto->getDescricao(),
        );
    }
}
