import React from 'react';
import { Link } from '@inertiajs/react';

const EmployeesShow = ({ employee }) => {
    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Employee Details</h1>
                            <div className="flex space-x-3">
                                <Link 
                                    href={`/employees/${employee.id}/edit`}
                                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                >
                                    Edit Employee
                                </Link>
                                <Link 
                                    href="/employees"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Back to Employees
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Employee Information */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                            <p className="text-lg text-gray-900">{employee.name}</p>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Designation</label>
                                            <p className="text-lg text-gray-900">{employee.designation}</p>
                                        </div>
                                        
                                        {employee.department && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                                                <p className="text-lg text-gray-900">{employee.department}</p>
                                            </div>
                                        )}
                                        
                                        {employee.email && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                                <p className="text-lg text-gray-900">{employee.email}</p>
                                            </div>
                                        )}
                                        
                                        {employee.phone && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                                <p className="text-lg text-gray-900">{employee.phone}</p>
                                            </div>
                                        )}
                                        
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Tasks */}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
                                
                                {employee.tasks && employee.tasks.length > 0 ? (
                                    <div className="space-y-3">
                                        {employee.tasks.slice(0, 5).map((task) => (
                                            <div key={task.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                                <p className="font-medium text-gray-900">{task.todo_title}</p>
                                                <p className="text-sm text-gray-600">
                                                    {new Date(task.date).toLocaleDateString()} • Assigned by: {task.assigned_by}
                                                </p>
                                            </div>
                                        ))}
                                        {employee.tasks.length > 5 && (
                                            <p className="text-sm text-gray-500 text-center">
                                                ... and {employee.tasks.length - 5} more tasks
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p>No tasks assigned yet</p>
                                        <Link 
                                            href="/employee-tasks/create"
                                            className="text-blue-600 hover:text-blue-700 text-sm mt-2 inline-block"
                                        >
                                            Assign a task
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeesShow;