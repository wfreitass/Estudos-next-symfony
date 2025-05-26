<?php

// src/Dto/Input/ProdutoInputDto.php
namespace App\Dto\Input;

use Symfony\Component\Validator\Constraints as Assert;

class ProdutoInputDto
{

    private ?string $nome = null;

    private ?int $quantidade = null;

    #[Assert\NotBlank(message: "O campo ativo é obrigatório.")]
    private ?bool $ativo = null;

    private ?string $descricao = null;

    public function __construct(
        ?string $nome,
        ?int $quantidade,
        ?bool $ativo,
        ?string $descricao
    ) {
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->ativo = $ativo;
        $this->quantidade = $quantidade;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function getQuantidade()
    {
        return $this->quantidade;
    }

    public function getAtivo()
    {
        return $this->ativo;
    }

    public function getDescricao()
    {
        return $this->descricao;
    }
}
