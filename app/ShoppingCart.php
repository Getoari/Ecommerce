<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $fillable = ['user_id', 'stock_id', 'quantity'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function stock() {
        return $this->belongsTo('App\Stock');
    }
}
