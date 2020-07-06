<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Newsletter\NewsletterFacade as Newsletter;

class NewsLetterController extends Controller
{   
    public function store(Request $request){

        if(! NewsLetter::isSubscribed($request->value)){
            NewsLetter::subscribePending($request->value);
            return 'Thanks For Subscribe! Check your email for next steps!';    
        }
        return 'Sorry you have already subscribed!';
    }
}