<?php

namespace App\Repositories;

use App\Models\Bidding;

class BiddingRepository
{
    private Bidding $repository;
    public function __construct()
    {
        $this->repository = new Bidding();
    }

    public function create($data)
    {
        return $this->repository->create([
            'itemId' => $data['itemId'],
            'price' => $data['price'],
            'userName' => $data['userName'],
        ]);
    }

    public function getBindings($itemId) {
        return $this->repository->where('itemId', $itemId)
            ->orderByDesc('price')->get();
    }
}
