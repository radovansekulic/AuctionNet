<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

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

    public function login(array $data)
    {
        $user = $this->repository->firstWhere('email', $data['email']);

        if ($user && Hash::check($data['password'], $user->password)) {
            return $user->createToken('token')->plainTextToken;
        } else {
            return ['message' => 'Login unsuccessful. Check your email and password.'];
        }
    }

}
