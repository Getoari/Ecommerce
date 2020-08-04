<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Dashboard
Route::get('/dashboard', 'DashboardController@index');

// JWT Authenficiation
Route::get('/auth', 'UserController@getAuthenticatedUser');
Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');

// Address
Route::get('/user/default-address', 'UserAddressController@show');
Route::post('/user/create-user-address', 'UserAddressController@createUser');
Route::post('/user/address', 'UserAddressController@store');

// Product
Route::get('/products', 'ProductController@index');
Route::get('/products/{id}', 'ProductController@show');
Route::get('/product/hot-deal', 'ProductDealsController@hotDeals');
Route::post('/products', 'ProductController@store');
Route::delete('/products/{id}', 'ProductController@destroy');

// Product Orders
Route::post('/stripe', 'ProductOrdersController@stripePost');
Route::post('/product/orders', 'ProductOrdersController@store');

// Product Categories
Route::get('/product/categories', 'ProductCategoriesController@index');
Route::get('/product/categories/{id}/top-selling', 'ProductCategoriesController@topSelling');
Route::get('/product/categories/{id}/new', 'ProductCategoriesController@new');

// Product Shopping Cart
Route::get('/product/cart-list/count', 'ProductShoppingCartController@cartCount');
Route::get('/product/cart-list/', 'ProductShoppingCartController@index');
Route::post('/product/cart-list', 'ProductShoppingCartController@store');
Route::post('/product/cart-list/guest', 'ProductShoppingCartController@guestCart');
Route::put('/product/cart-list/{id}', 'ProductShoppingCartController@update');
Route::delete('/product/cart-list/{id}', 'ProductShoppingCartController@destroy');

//Product Wishlist
Route::get('/product/wishlist/count', 'ProductWishlistController@count');
Route::get('/product/wishlist', 'ProductWishlistController@index');
Route::post('/product/wishlist', 'ProductWishlistController@store');
Route::delete('/product/wishlist/{id}', 'ProductWishlistController@destroy');

// Product Stocks
Route::get('/product/stocks/{id}', 'ProductStocksController@show');

// Newsletter
Route::post('/newsletter', 'NewsLetterController@store');
