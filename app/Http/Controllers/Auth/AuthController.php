<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
//            $request->session()->regenerate();
            return response()->json(auth()->user(), 200);
        }

        return response()->json([
            'message' => 'Failed'
        ], 400);
    }

    public function profile(Request $request)
    {
        return response()->json($request->user(), 200);
    }
}
