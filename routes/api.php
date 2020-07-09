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

Route::post('/register', 'UserController@register');
Route::post('/login', 'UserController@login');
Route::get('/logout', 'UserController@logout');
Route::get('/auth', 'UserController@getAuthenticatedUser');

Route::resource('/products', 'ProductController');

Route::get('/product/categories/{id}/top-selling', 'ProductCategoriesController@topSelling');
Route::get('/product/categories/{id}/new', 'ProductCategoriesController@new');
Route::resource('/product/categories', 'ProductCategoriesController');

Route::post('/newsletter', 'NewsLetterController@store');
