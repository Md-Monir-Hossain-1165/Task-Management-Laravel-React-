<?php
// database/migrations/2024_01_01_000000_create_employee_tasks_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('employee_tasks', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('employee_name');
            $table->string('designation');
            $table->string('todo_title');
            $table->string('assigned_by');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('employee_tasks');
    }
};