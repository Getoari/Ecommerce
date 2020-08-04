<!-- welcome.blade.php -->

<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

     <!-- CSRF Token -->
     <meta name="csrf-token" content="{{ csrf_token() }}">

     <title>Laravel</title>
     <link href="{{asset('css/dashboard.css')}}" rel="stylesheet" type="text/css">

     <!-- Custom fonts for this template-->
    {{-- <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"> --}}
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="{{asset('css/sb-admin-2.min.css')}}" rel="stylesheet">
</head>
<body id="page-top">
<div id="wrapper"></div>
<script src="{{asset('js/dashboard.js')}}" ></script>
</body>
</html>
