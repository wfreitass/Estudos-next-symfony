<?php

namespace App\Controller;

use App\Dto\Input\ProdutoInputDto;
use App\Dto\Output\ProdutoOutputDto;
use App\Exception\ProdutoNotFoundException;
use App\Exception\ProdutoValidacaoException;
use App\Service\Interface\ProdutoServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
// use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/produtos', name: 'api_product_')]
final class ProdutoController extends AbstractController
{

    public function __construct(
        private ProdutoServiceInterface $productService,
        private ValidatorInterface $validator
    ) {}


    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {

        $pagina = max(1, $request->query->getInt('page', 1));
        $limite = max(1, $request->query->getInt('limit', 10));
        $resultado =  $this->productService->getAllProdutos($pagina, $limite);

        return $this->json($resultado);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        try {
            return $this->json(
                ProdutoOutputDto::fromEntity($this->productService->getProduto($id)),
                201
            );
        } catch (ProdutoNotFoundException $e) {
            return $this->json([
                'error' => $e->getMessage()
            ], 404);
        }
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, SerializerInterface $serializer): JsonResponse
    {
        try {
            // $dados = json_decode($request->getContent(), true);
            $dados = $serializer->deserialize(
                $request->getContent(),
                ProdutoInputDto::class,
                'json'
            );
            $produto = $this->productService->createProduto($dados);

            return $this->json(
                ProdutoOutputDto::fromEntity($produto),
                201
            );
        } catch (ProdutoValidacaoException $e) {
            return $this->json([
                'erros' => $e->getErrosValidacao()
            ], 422); // HTTP 422 Unprocessable Entity
        }
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, Request $request, SerializerInterface $serializer): JsonResponse
    {
        // $data = json_decode($request->getContent(), true);
        $data = $serializer->deserialize(
            $request->getContent(),
            ProdutoInputDto::class,
            'json'
        );

        try {
            $product = $this->productService->updateProduto($id, $data);
            return $this->json(
                ProdutoOutputDto::fromEntity($product),
                201
            );
        } catch (ProdutoNotFoundException $e) {
            return $this->json(['error' => $e->getMessage()], 404);
        }
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        try {
            $this->productService->deleteProduto($id);
            return new JsonResponse(null, 204);
        } catch (ProdutoNotFoundException $e) {
            return $this->json(['error' => $e->getMessage()], 404);
        }
    }
}
