<?php

namespace App\Http\Controllers;

use App\User;
use App\Address;
use App\ShoppingCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserAddressController extends Controller
{
    public function createUser(Request $request) {

        $user = User::create([
            'name' => $request->firstName . ' ' . $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $address = Address::create([
            'user_id' => $user->id,
            'firstname' => $request->firstName,
            'lastname' => $request->lastName,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'zip' => $request->zip,
            'telephone' => $request->telephone
        ]);

        if($request->localCartList) {

            $cartList = json_decode($request->localCartList, true);

            foreach( $cartList as $cartArrayList) {
                foreach($cartArrayList as $cartItem) {

                    $item = $user->cartItems()
                            ->where('stock_id', $cartItem['stock_id'])
                            ->first();

                    if (!$item) {
                        ShoppingCart::create([
                            'user_id' => $user->id,
                            'stock_id' => $cartItem['stock_id'],
                            'quantity' => $cartItem['quantity']
                        ]);
                    }
                }
            }

        }

        $user->update(['address_id' => $address->id]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }

    public function show() {
        $user = JWTAuth::parseToken()->authenticate();

        return $user->addresses()->where('id', $user->address_id)->first();
    }

    public function store(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();

        $address = Address::create([
            'user_id' => $user->id,
            'firstname' => $request->firstName,
            'lastname' => $request->lastName,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'zip' => $request->zip,
            'telephone' => $request->telephone
        ]);

        $user->update(['address_id' => $address->id]);
    }
}
