<?php

namespace App\Exception;

use Symfony\Component\Validator\ConstraintViolationListInterface;

class ProdutoValidacaoException extends \RuntimeException
{
    public function __construct(
        private ConstraintViolationListInterface $errosValidacao
    ) {
        parent::__construct("Erros de validação nos dados fornecidos");
    }

    public function getErrosValidacao(): array
    {
        $erros = [];
        foreach ($this->errosValidacao as $violation) {
            $erros[$violation->getPropertyPath()][] = $violation->getMessage();
        }
        return $erros;
    }
}
