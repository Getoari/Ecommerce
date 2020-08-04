<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'user_id', 'category_id', 'photo', 'brand', 'name', 'description', 'details', 'price',
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

    public function stocks()
    {
        return $this->hasMany('App\Stock');
    }
}
