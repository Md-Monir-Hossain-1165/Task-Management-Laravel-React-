<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeTaskController;
use App\Http\Controllers\EmployeeController;

Route::get('/', [EmployeeTaskController::class, 'dashboard'])->name('home');
Route::resource('employee-tasks', EmployeeTaskController::class);
Route::resource('employees', EmployeeController::class);

// Keep your other routes
Route::get('/teams', function () {
    return inertia('Teams/Index');
})->name('teams');

