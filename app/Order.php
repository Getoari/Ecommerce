<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'stock_id', 'quantity', 'note', 'status'];

    public function user() {
        return $this->belongsTo('App\User');
    }

    public function stock() {
        return $this->belongsTo('App\Stock');
    }

    public function product(){
        return $this->hasOneThrough('App\Product', 'App\Stock');
    }
}
