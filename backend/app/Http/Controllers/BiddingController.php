<?php

namespace App\Http\Controllers;
use App\Http\Requests\CreateBiddingRequest;
use App\Repositories\BiddingRepository;

use Illuminate\Http\Request;

class BiddingController extends Controller
{
    private BiddingRepository $biddingRepository;
    public function __construct(BiddingRepository $biddingRepository)
    {
        $this->biddingRepository = $biddingRepository;
    }

    public function create(CreateBiddingRequest $request) {
        return $this->biddingRepository->create($request->validated());
    }

    public function getBid($itemId) {
        return $this->biddingRepository->getBindings($itemId);
    }
}
