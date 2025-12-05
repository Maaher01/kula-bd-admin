<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $limit = $request->limit;
        $users = User::with('role')->paginate($limit);

        return response()->json(['status' => true, 'data' => $users], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::with('role')->where('id', $id)->first();

        return response()->json(['status' => true, 'data' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'role_id' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 202);
        }

        $path = "";
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $path = $image->store('userimages', 'public');
        }

        $updatedUser = User::where('id', '=', $id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'role_id' => $request->role_id,
            'photo' => asset("/uploads") . "/" . $path
        ]);

        return response()->json(['status' => true, 'data' => $updatedUser]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['status' => true, 'message' => 'User deleted successfully']);
    }
}
