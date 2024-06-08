<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::namespace('App\Http\Controllers')->name('api.')->group(function(){

    
    Route::prefix('/base')->name('base.')->group(function () {
        Route::get('/', 'BaseController@index')->name('index');
        Route::get('/set-lang/{lang}','BaseController@setLang');
    });
    
    Route::post('/login', 'AuthController@login')->name("login");

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/user', 'ProfileController@index');
        Route::post('/logout', 'AuthController@logout')->name("logout");

        Route::namespace('Settings')->prefix('/settings')->group(function () {

            Route::prefix('/user')->name('user.')->group(function () {
                Route::get('/', 'UserController@index')->name('index');
                Route::post('/store','UserController@store')->name('store');
                Route::get('/{id}', 'UserController@show')->name('show');
                Route::post('/{id}/update','UserController@update')->name('update');
                Route::delete('/{id}/delete','UserController@destroy')->name('delete');
            });

            
            Route::prefix('/permissions')->name('permissions.')->group(function () {
                Route::get('/', 'PermissionController@index')->name('index');
                Route::get('/list', 'PermissionController@list')->name('list');
                Route::post('/store','PermissionController@store')->name('store');
                Route::get('/{id}', 'PermissionController@show')->name('show');
                Route::post('/{id}/update','PermissionController@update')->name('update');
                Route::delete('/{id}/delete','PermissionController@destroy')->name('delete');
            });

            Route::prefix('/language')->name('language.')->group(function () {
                Route::get('/', 'LanguageController@index')->name('index');
                Route::post('/store','LanguageController@store')->name('store');
                Route::get('/{id}', 'LanguageController@show')->name('show');
                Route::post('/{id}/update','LanguageController@update')->name('update');
                Route::delete('/{id}/delete','LanguageController@destroy')->name('delete');
            });

            
            Route::prefix('/branch')->name('branch.')->group(function () {
                Route::get('/', 'BranchController@index')->name('index');
                Route::post('/store','BranchController@store')->name('store');
                Route::get('/{id}', 'BranchController@show')->name('show');
                Route::post('/{id}/update','BranchController@update')->name('update');
                Route::delete('/{id}/delete','BranchController@destroy')->name('delete');
            });

            
            Route::prefix('/general')->name('general.')->group(function () {
                Route::get('/', 'SystemController@general');
                Route::post('/update','SystemController@generalUpdate');
            });
            
            Route::prefix('/email')->name('email.')->group(function () {
                Route::get('/', 'SystemController@email');
                Route::post('/update','SystemController@emailUpdate');
            });
        });
    });
});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
