<?php

namespace App\Http\Controllers;

use App\Deal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductDealsController extends Controller
{
    function hotDeals(){

        $now = Carbon::now();
        $hotDeal = Deal::where('starts', '<=', $now)
            ->where('ends', '>=', $now)
            ->orderBy('sale','desc')
            ->first();
        return $hotDeal;
    }
}
