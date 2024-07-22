<?php

namespace App\Repositories;

use App\Models\Auction;

class AuctionRepository
{
    private Auction $repository;
    public function __construct()
    {
        $this->repository = new Auction();
    }

    public function create(array $data) {
        return $this->repository->create([
            'title' => $data['title'],
            'description' => $data['description'],
            'startingPrice' => $data['startingPrice'],
            'image' => $data['image']->store('images', 'public'),
            'userId' => $data['userId'],
        ]);
    }

    public function getAll() {
        return $this->repository->orderByDesc('id')->get();
    }

    public function dashboard($userId) {
        return $this->repository->where('userId', $userId)->get();
    }

    public function item($id) {
        return $this->repository->where('id', $id)->get();
    }
}
