<?php

namespace App\Http\Controllers;

use DB;
use Carbon\Carbon;
use App\Order;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {

        $monthlyEarnings = DB::table('orders')
        ->whereBetween('orders.created_at', [
            Carbon::now()->startOfYear(),
            Carbon::now()->endOfYear(),
        ])
        ->join('stocks','stock_id', '=', 'stocks.id')
        ->join('products', 'stocks.id', '=', 'stock_id')
        ->select(
            DB::raw('sum(price) as sums'), 
            DB::raw("DATE_FORMAT(orders.created_at,'%M') as months")
        )
        ->groupBy('months')
        ->orderBy('orders.id', 'desc')
        ->get();

        $annualEarnings = DB::table('orders')
        ->join('stocks','stock_id', '=', 'stocks.id')
        ->join('products', 'stocks.id', '=', 'stock_id')
        ->select(
            DB::raw('sum(price) as sums'), 
            DB::raw("DATE_FORMAT(orders.created_at,'%Y') as years")
        )
        ->groupBy('years')
        ->get();

        $ordersCompletedRatio = Order::where('status', 'completed')->count()/Order::count();

        $ordersPending = Order::where('status', 'pending')->count();

        $revenueSources = DB::table('orders')
                ->leftJoin('stocks','orders.stock_id','=','stocks.id')
                ->leftJoin('products','stocks.product_id','=','products.id')
                ->leftJoin('categories','products.category_id','=','categories.id')
                ->select(
                    DB::raw('categories.name as name'),
                    DB::raw('COALESCE(sum(orders.quantity),0) total')
                )
                ->groupBy('categories.name')
                ->orderBy('total','desc')
                ->take(3)
                ->get();


        $data = [
            'monthly_earnings' => $monthlyEarnings,
            'annual_earnings' => $annualEarnings,
            'orders_completed_ratio' => $ordersCompletedRatio,
            'orders_pending' => $ordersPending,
            'revenue_sources' => $revenueSources,
        ];

        return response()->json($data);
    }

    
}

