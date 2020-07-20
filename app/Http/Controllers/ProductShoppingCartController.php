<?php

namespace App\Http\Controllers;

use App\Stock;
use App\Product;
use App\ShoppingCart;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class ProductShoppingCartController extends Controller
{
    public function store(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();

        if($request->localCartList) {

            $cartList = json_decode($request->localCartList, true);

            foreach( $cartList as $cartArrayList) {
                foreach($cartArrayList as $cartItem) {

                    $item = ShoppingCart::where('stock_id', $cartItem['stock_id'])
                            ->where('user_id', $user->id)
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

        } else {

            $item = ShoppingCart::where('stock_id', $request->stockId)
                    ->where('user_id', $user->id)
                    ->first();

            if (!$item) {
                ShoppingCart::create([
                    'user_id' => $user->id,
                    'stock_id' => $request->stockId,
                    'quantity' => $request->quantity
                ]);
            } else {
                $stock = Stock::findOrFail($request->stockId);

                if(($item->quantity + $request->quantity) <= $stock->quantity)
                    $item->increment('quantity', $request->quantity);
                else {
                    $item->update(['quantity' => $stock->quantity]);
                }
            }

            return $user->cartItems()->count();
        }

    }

    public function show($id) {

        $cartList = ShoppingCart::with('stock.product')
                ->where('user_id', $id)
                ->orderBy('id', 'desc')
                ->get();
        
        return $cartList;
    }

    public function guestCart(Request $request) {

        $cartList = json_decode($request['cartList'], true);

        $data = [];
        $count = 1;
        foreach( $cartList as $cartArrayList) {
            foreach($cartArrayList as $cartItem) {
                if( $cartItem['stock_id'] != null || $cartItem['quantity'] != null) { 

                    $stock = null;
                    if($cartItem['stock_id'] != null) {
                        $stock = Stock::with('product')->where('id', $cartItem['stock_id'])->first();
                    }

                    $data[] = ['id' => $count, 'stock_id' => $cartItem['stock_id'], 'quantity' => $cartItem['quantity'], 'stock' => $stock];
                    $count++;
                }
            }
        }

        return $data;
    }

    public function update(Request $request, $id) {

        $cartItem = ShoppingCart::with('stock')->where('id', $id)->get();

        $stockQty = $cartItem->pluck('stock.quantity')->pop();

        if($request->quantity <= $stockQty && $request->quantity > 0)
            ShoppingCart::where('id', $id)->update(['quantity' => $request->quantity]);
    }

    public function destroy($id) {

        $cartItem = ShoppingCart::findOrFail($id);

        if($cartItem)
            $cartItem->delete();

        return $cartItem;
    }


    public function cartCount(Request $request) {
        $user = JWTAuth::parseToken()->authenticate();

        return $user->cartItems()->pluck('stock_id')->toArray();
    }
}