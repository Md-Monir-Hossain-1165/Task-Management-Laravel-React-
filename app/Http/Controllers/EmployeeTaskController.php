<?php
// app/Http/Controllers/EmployeeTaskController.php

namespace App\Http\Controllers;

use App\Models\EmployeeTask;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeTaskController extends Controller
{
    public function index()
    {
        $tasks = EmployeeTask::orderBy('date', 'desc')->get();
        
        return Inertia::render('EmployeeTasks/Index', [
            'tasks' => $tasks
        ]);
    }

    public function create()
    {
        return Inertia::render('EmployeeTasks/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'todo_title' => 'required|string|max:255',
            'assigned_by' => 'required|string|max:255',
        ]);

        // Get employee details
        $employee = Employee::findOrFail($request->employee_id);

        EmployeeTask::create([
            'date' => $request->date,
            'employee_id' => $request->employee_id,
            'employee_name' => $employee->name, // Auto-fill from employee table
            'designation' => $employee->designation, // Auto-fill from employee table
            'todo_title' => $request->todo_title,
            'assigned_by' => $request->assigned_by,
        ]);

        return redirect()->route('employee-tasks.index')
            ->with('success', 'Task assigned successfully!');
    }

    public function show(EmployeeTask $employeeTask)
    {
        return Inertia::render('EmployeeTasks/Show', [
            'task' => $employeeTask
        ]);
    }

    public function edit(EmployeeTask $employeeTask)
    {
        return Inertia::render('EmployeeTasks/Edit', [
            'task' => $employeeTask
        ]);
    }

    public function update(Request $request, EmployeeTask $employeeTask)
    {
        $request->validate([
            'date' => 'required|date',
            'employee_name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'todo_title' => 'required|string|max:255',
            'assigned_by' => 'required|string|max:255',
        ]);

        $employeeTask->update($request->all());

        return redirect()->route('employee-tasks.index')
            ->with('success', 'Task updated successfully!');
    }

    public function destroy(EmployeeTask $employeeTask)
    {
        $employeeTask->delete();

        return redirect()->route('employee-tasks.index')
            ->with('success', 'Task deleted successfully!');
    }

    public function dashboard()
{
    $today = now()->format('Y-m-d');
    
    // Get today's tasks with employee relationship
    $todaysTasks = EmployeeTask::with('employee')
        ->whereDate('date', $today)
        ->orderBy('created_at', 'desc')
        ->get();
    
    // Get all active employees
    $allEmployees = Employee::where('is_active', true)
        ->orderBy('name')
        ->get()
        ->map(function($employee) {
            return $employee->name . ' - ' . $employee->designation;
        })
        ->toArray();
            
    return Inertia::render('Home', [
        'employee_tasks' => $todaysTasks,
        'all_employees' => $allEmployees
    ]);
}
}