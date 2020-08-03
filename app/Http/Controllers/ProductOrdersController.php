<?php

namespace App\Http\Controllers;

use Stripe;
use App\Order;
use App\Stock;
use App\ShoppingCart;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

Stripe\Stripe::setApiKey(\config('values.STRIPE_SECRET'));

class ProductOrdersController extends Controller
{
    function calculateOrderAmount(array $items): int {

        $price = 0;
        $checkoutItems = [];

        foreach($items as $item) {
            if($item['quantity'] > 0)
                $checkoutItems[] = ['stock_id' => $item['stock_id'], 'quantity' => $item['quantity']];
            else
                abort(500);
        }

        $user = JWTAuth::parseToken()->authenticate();

        $cartList = $user->cartItems()
                ->with('stock.product')
                ->get();

        foreach($cartList as $cartItem) {
            foreach($checkoutItems as $checkoutItem)
                if($cartItem->stock_id == $checkoutItem['stock_id'])
                    $price += $cartItem->stock->product->price * $checkoutItem['quantity'];
        }

        return $price*100;
    }

    public function stripePost(Request $request)
    {
        try {
            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $this->calculateOrderAmount($request->toArray()),
                'currency' => 'usd',               
                'description' => "Test payment from bug-busters.localhost" 
            ]);

            $output = [
                'clientSecret' => $paymentIntent->client_secret,
            ];

            echo json_encode($output);
        } catch (Error $e) {
            http_response_code(500);
            echo json_encode(['error' => $e->getMessage()]);
        }
    }

    public function store(Request $request) {

        $user = JWTAuth::parseToken()->authenticate();
        $note = $request->note;

        foreach($request->items as $item) {
            
            Order::create([
                'user_id' => $user->id,
                'stock_id' => $item['stock_id'], 
                'quantity' => $item['quantity'],
                'note' => $note,
                'status' => 'pending'
            ]);

            Stock::findOrFail($item['stock_id'])->decrement('quantity', $item['quantity']);

            $user->cartItems()->where('stock_id', $item['stock_id'])->delete();
        }
    }
}
