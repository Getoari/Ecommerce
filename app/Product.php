<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'photo', 'brand', 'name', 'size', 'color', 'desctiption', 'details', 'sale', 'sale_expires', 'price',
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }
    
    public function category() {
        return $this->belongsTo('App\Category');
    }

    public function reviews() {
        return $this->hasMany('App\Review');
    }
}
