<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->integer('stock_id')->unsigned()->index();
            $table->integer('quantity');
            $table->string('note')->nullable();
            $table->string('status');
            $table->timestamps();
        });

        if(config('app.debug') == true) {
            DB::table('orders')->insert([     
                ['user_id' => 1,
                'stock_id' => 1,
                'quantity' => 1,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 21,
                'stock_id' => 1,
                'quantity' => 2,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 31,
                'stock_id' => 1,
                'quantity' => 1,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 41,
                'stock_id' => 2,
                'quantity' => 3,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 51,
                'stock_id' => 3,
                'quantity' => 2,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 61,
                'stock_id' => 3,
                'quantity' => 1,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 71,
                'stock_id' => 4,
                'quantity' => 3,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 81,
                'stock_id' => 5,
                'quantity' => 4,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
            DB::table('orders')->insert([     
                ['user_id' => 91,
                'stock_id' => 6,
                'quantity' => 1,
                'note' => null,
                'status' => 'completed',
                'created_at' => now()],
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
