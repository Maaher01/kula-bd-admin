<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function show(Request $request)
    {
        $limit = $request->limit;
        $roles = Role::paginate($limit);
        return response()->json(['status' => true, 'data' => $roles]);
    }

    public function changePermission(Request $request)
    {
        $request->validate([
            'role_id' => 'required|exists:roles,id',
            'permissions' => 'required|array',
            'permissions.*' => 'integer'
        ]);

        $role = Role::findOrFail($request->role_id);

        $role->permissions = implode(',', $request->permissions);
        $role->save();

        return response()->json([
            'message' => 'Permissions updated successfully.',
        ]);
    }
}
