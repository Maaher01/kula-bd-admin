<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            // $request->session()->regenerate();

            $user = Auth::user();

            $token = $user->createToken('api_token')->plainTextToken;

            $role = $user->role;
            $permissions = $role && $role->permissions ? array_map('intval', explode(',', $role->permissions)) : [];

            return response()->json(['user' => $user, 'permissions' => $permissions, 'token' => $token]);
        }

        return response()->json([
            'errors' => [
                'message' => 'The provided credentials do not match our records.',
            ]
        ], 422);
    }

    public function logout(Request $request)
    {
        auth('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['status' => true, 'message' => 'logged out']);
    }
}
