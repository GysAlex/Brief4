<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(AuthRequest $request)
    {
        $fields = $request->validated();

        $user = User::create($fields);

        $token = $user->createToken($fields['email']);

        return ['user' => $user, 'token' => $token->plainTextToken];
    }

    public function login(LoginRequest $request)
    {
        $fields = $request->validated();

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password))
        {
            return ['logfail', 'vos identifiants sont incorrectes'];
        }

        $token = $user->createToken($user->name);

        return ['user' => $user, 'token' => $token->plainTextToken];
    }

    public function logout()
    {
        request()->user()->tokens()->delete();

        return ['message' => 'au revoir !'];
    }

}
