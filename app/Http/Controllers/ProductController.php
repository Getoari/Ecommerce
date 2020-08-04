<?php

namespace App\Http\Controllers;

use App\Stock;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProduct;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index() {
        return Product::with('category', 'stocks')->paginate(5);
    }

    public function show($id)
    {
        $product = Product::with('category', 'stocks')->findOrFail($id);

        if ($product->reviews()->exists()) {
            $product['review'] = $product->reviews()->avg('rating');
            $product['num_reviews'] = $product->reviews()->count();
        }

        return $product;
    }

    public function store(StoreProduct $request) {

        if($user = JWTAuth::parseToken()->authenticate()) {

            $validator = $request->validated();

            $data = null;
            if($request->hasFile('photos')) {
                foreach($request->file('photos') as $photo) {
                    $name = time() . '_' . $photo->getClientOriginalName();
                    $photo->move('img', $name);
                    $data[] = $name;
                }
            }

            $product = Product::create([
                'user_id' => $user->id,
                'category_id' => $request->category_id,
                'photo' => json_encode($data),
                'brand' => $request->brand,
                'name' => $request->name,
                'description' => $request->description,
                'details' => $request->details,
                'price' => $request->price,
            ]);

            Stock::create([
                'product_id' => $product->id,
                'size' => $request->size,
                'color' => $request->color,
                'quantity' => $request->quantity,
            ]);

        }
        
    }

    public function destroy($id) {

        if($user = JWTAuth::parseToken()->authenticate()) {
            $product = Product::findOrFail($id);
    
            // return $product->photo;
            if($product) {
                if($product->photo != null)
                    foreach(json_decode($product->photo) as $photo)    
                        unlink(public_path() . '\\img\\' . $photo);
    
                $product->delete();
            }
        }
    }

}
