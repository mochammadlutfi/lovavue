<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;
class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request)
    {
        $id = auth()->user()->id;

        $data = User::where('id', $id)->first();

        $data->permissions = $data->getPermissionsViaRoles()->pluck('name');
        
        return response()->json($data);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {

    }

}
