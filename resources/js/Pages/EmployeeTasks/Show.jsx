import React from 'react';
import { Link } from '@inertiajs/react';

const EmployeeTasksShow = ({ task }) => {
    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Task Details</h1>
                            <div className="flex space-x-3">
                                <Link 
                                    href={`/employee-tasks/${task.id}/edit`}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Edit Task
                                </Link>
                                <Link 
                                    href="/employee-tasks"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Back to List
                                </Link>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                                <p className="text-lg text-gray-900">
                                    {new Date(task.date).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>

                            {/* Employee Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Employee Name</label>
                                <p className="text-lg text-gray-900">{task.employee_name}</p>
                            </div>

                            {/* Designation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Designation</label>
                                <p className="text-lg text-gray-900">{task.designation}</p>
                            </div>

                            {/* To-Do Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">To-Do Title</label>
                                <p className="text-lg text-gray-900">{task.todo_title}</p>
                            </div>

                            {/* Assigned By */}
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Assigned By</label>
                                <p className="text-lg text-gray-900">{task.assigned_by}</p>
                            </div>

                            {/* Created & Updated At */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                                    <p className="text-sm text-gray-600">
                                        {new Date(task.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500 mb-1">Updated At</label>
                                    <p className="text-sm text-gray-600">
                                        {new Date(task.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTasksShow;