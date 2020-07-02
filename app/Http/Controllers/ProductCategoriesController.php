<?php

namespace App\Http\Controllers;

use App\Product;
use App\Category;
use App\Review;
use Illuminate\Http\Request;

class ProductCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all();
    }

    
    /**
     * Display all products by categoryId
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function new($id) {
        
        $products = Product::with('category')->where('category_id', $id)->orderBy('id', 'desc')->take(5)->get();

        foreach($products as $product) {
            if($product->reviews())
                $product['review'] = $product->reviews()->avg('rating');
        }

        return $products;
    }
}
