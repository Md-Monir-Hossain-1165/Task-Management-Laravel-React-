<?php
// database/migrations/2024_01_01_000002_update_employee_tasks_table_add_employee_id.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('employee_tasks', function (Blueprint $table) {
            // Add employee_id foreign key
            $table->foreignId('employee_id')->nullable()->constrained('employees')->onDelete('cascade');
            
            // Keep employee_name for backward compatibility, but it will be auto-filled
            // We'll keep it for now, you can remove it later
        });
    }

    public function down()
    {
        Schema::table('employee_tasks', function (Blueprint $table) {
            $table->dropForeign(['employee_id']);
            $table->dropColumn('employee_id');
        });
    }
};