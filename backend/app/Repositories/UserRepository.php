<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    private User $repository;
    public function __construct()
    {
        $this->repository = new User();
    }
    public function register(array $data)
    {
        return $this->repository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
