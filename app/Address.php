<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = ['user_id', 'firstname', 'lastname', 'address', 'city', 'country', 'zip', 'telephone'];

    public function user() {
        return $this->belongsTo('App\User');
    }
}
