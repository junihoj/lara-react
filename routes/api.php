<?php

use App\Http\Controllers\API\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/add-student', [StudentController::class, 'store']);

Route::get('/students', [StudentController::class, 'index']);
Route::get('edit-student/{student}/', [StudentController::class, 'edit']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::put('/update-student/{student}',[StudentController::class, 'update']);
Route::delete('delete-student/{id}', [StudentController::class, 'destroy']);
