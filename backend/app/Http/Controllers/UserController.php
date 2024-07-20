<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Repositories\UserRepository;

class UserController extends Controller
{
    private UserRepository $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(RegisterUserRequest $request)
    {
        return $this->userRepository->register($request->validated());
    }

    public function login(LoginUserRequest $request)
    {
        return $this->userRepository->login($request->validated());
    }
}
