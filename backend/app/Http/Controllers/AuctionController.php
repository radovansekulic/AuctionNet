<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAuctionRequest;
use App\Repositories\AuctionRepository;

class AuctionController extends Controller
{
    private AuctionRepository $auctionRepository;
    public function __construct(AuctionRepository $auctionRepository)
    {
        $this->auctionRepository = $auctionRepository;
    }
    public function create(CreateAuctionRequest $request) {
        return $this->auctionRepository->create($request->validated());
    }
    public function getAll() {
        return $this->auctionRepository->getAll();
    }

}
