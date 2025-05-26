<?php

namespace App\Service;

use App\Dto\Input\ProdutoInputDto;
use App\Dto\Output\ProdutoOutputDto;
use App\Entity\Produto;
use App\Repository\Interface\ProdutoRepositoryInterface;
use App\Service\Interface\ProdutoServiceInterface;
use App\Exception\ProdutoNotFoundException;
use App\Exception\ProdutoValidacaoException;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProdutoService implements ProdutoServiceInterface
{
    public function __construct(
        private ProdutoRepositoryInterface $repository,
        private ValidatorInterface $validador
    ) {}

    public function createProduto(ProdutoInputDto $data): Produto
    {
        $product = new Produto();
        $product->setNome($data->getNome());
        $product->setQuantidade($data->getQuantidade());
        $product->setDescricao($data->getDescricao());
        $product->setAtivo($data->getAtivo());

        $this->validarEntidade($product);

        $this->repository->save($product);
        return $product;
    }

    public function updateProduto(int $id, ProdutoInputDto $data): Produto
    {
        $product = $this->repository->get($id);

        if (!$product) {
            throw new ProdutoNotFoundException($id);
        }

        if ($data->getNome()) $product->setNome($data->getNome());
        if ($data->getQuantidade()) $product->setQuantidade($data->getQuantidade());
        if ($data->getDescricao()) $product->setDescricao($data->getDescricao());
        if ($data->getAtivo()) $product->setAtivo($data->getAtivo());


        $this->validarEntidade($product);

        $this->repository->save($product);
        return $product;
    }


    public function deleteProduto(int $id): void
    {
        $product = $this->repository->get($id);

        if (!$product) {
            throw new ProdutoNotFoundException($id);
        }

        $this->repository->delete($product);
    }

    public function getProduto(int $id): Produto
    {
        $product = $this->repository->get($id);

        if (!$product) {
            throw new ProdutoNotFoundException($id);
        }

        return $product;
    }

    public function getAllProdutos(int $pagina = 1, int $limite = 10): array
    {
        $paginator = $this->repository->getAll($pagina, $limite);

        $items = [];
        foreach ($paginator as $produto) {
            $items[] = ProdutoOutputDto::fromEntity($produto);
        }

        $totalItems = count($paginator);
        $totalPaginas = ceil($totalItems / $limite);

        return [
            'items' => $items,
            'paginacao' => [
                'pagina' => $pagina,
                'limite' => $limite,
                'total' => $totalItems,
                'paginas' => $totalPaginas,
                'links' => $this->gerarLinks($pagina, $limite, $totalPaginas)
            ]
        ];
    }

    private function validarEntidade(Produto $produto): void
    {
        $erros = $this->validador->validate($produto);

        if ($erros->count() > 0) {
            throw new ProdutoValidacaoException($erros);
        }
    }


    private function gerarLinks(int $pagina, int $limite, int $totalPaginas): array
    {
        $baseUrl = '/api/produtos?';
        return [
            'self'  => $baseUrl . http_build_query(['page' => $pagina, 'limit' => $limite]),
            'first' => $baseUrl . http_build_query(['page' => 1, 'limit' => $limite]),
            'prev'  => $pagina > 1 ? $baseUrl . http_build_query(['page' => $pagina - 1, 'limit' => $limite]) : null,
            'next'  => $pagina < $totalPaginas ? $baseUrl . http_build_query(['page' => $pagina + 1, 'limit' => $limite]) : null,
            'last'  => $baseUrl . http_build_query(['page' => $totalPaginas, 'limit' => $limite])
        ];
    }
}
