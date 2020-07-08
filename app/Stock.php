<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = ['product_id', 'size', 'color', 'quantity'];

    public function product() {
        return $this->belongsTo('App\Product');
    }

    public function orders() {
        return $this->hasMany('App\Order');
    }
}
