<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->integer('category_id')->unsigned()->index();
            $table->integer('deal_id')->unsigned()->nullable()->index();
            $table->string('photo');
            $table->string('brand');
            $table->string('name');
            $table->string('description');
            $table->string('details');
            $table->double('price');
            $table->timestamps(); 
        });

        if(config('app.debug') == true) {
            DB::table('products')->insert([     
                ['user_id' => 1,
                'category_id' => 1,
                'deal_id'=>null,
                'photo' => '[
                    "product01.png",
                    "product03.png",
                    "product06.png",
                    "product08.png"
                    ]', 
                'brand' => 'HP',
                'Name' => 'HP Probook 4540s',
                'description' => 'This is the product description!',
                'details' => 'These are the product detials',
                'price' => 700,
                'created_at' => now()],
            ]);
            DB::table('products')->insert([     
                ['user_id' => 1,
                'category_id' => 1,
                'deal_id'=>null,
                'photo' => '[
                    "product01.png",
                    "product03.png",
                    "product06.png",
                    "product08.png"
                    ]', 
                'brand' => 'Dell',
                'Name' => 'Dell XPS',
                'description' => 'This is the product description!',
                'details' => 'These are the product detials',
                'price' => 1700,
                'created_at' => now()],
            ]);
            DB::table('products')->insert([     
                ['user_id' => 1,
                'category_id' => 1,
                'deal_id'=>null,
                'photo' => '[
                    "product03.png",
                    "product01.png",
                    "product06.png",
                    "product08.png"
                    ]', 
                'brand' => 'Acer',
                'name' => 'Acer Aspire',
                'description' => 'This is the product description!',
                'details' => 'These are the product detials',
                'price' => 1100,
                'created_at' => now()],
            ]);
            DB::table('products')->insert([     
                ['user_id' => 2,
                'category_id' => 1,
                'deal_id'=>null,
                'photo' => '[
                    "product06.png",
                    "product03.png",
                    "product01.png",
                    "product08.png"
                    ]', 
                'brand' => 'Apple',
                'name' => 'Apple Macbook Pro',
                'description' => 'This is the product description!',
                'details' => 'These are the product detials',
                'price' => 2000,
                'created_at' => now()],
            ]);
            DB::table('products')->insert([     
                ['user_id' => 2,
                'category_id' => 1,
                'deal_id'=>null,
                'photo' => '[
                    "product08.png",
                    "product03.png",
                    "product06.png",
                    "product01.png"
                    ]', 
                'brand' => 'Apple',
                'name' => 'Apple Macbook Air',
                'description' => 'This is the product description!',
                'details' => 'These are the product detials',
                'price' => 1900,
                'created_at' => now()],
            ]);
            DB::table('products')->insert([     
                ['user_id' => 2,
                'category_id' => 1,
                'deal_id'=>null,
                'photo' => '[
                    "product06.png",
                    "product01.png",
                    "product03.png",
                    "product08.png"
                    ]', 
                'brand' => 'Dell',
                'name' => 'Dell latitude',
                'description' => 'This is the product description!',
                'details' => 'These are the product detials',
                'price' => 500,
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
        Schema::dropIfExists('products');
    }
}
