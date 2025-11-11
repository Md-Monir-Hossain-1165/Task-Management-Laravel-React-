import React from 'react';
import { Link, useForm } from '@inertiajs/react';

const EmployeeTasksCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        date: new Date().toISOString().split('T')[0],
        employee_name: '',
        designation: '',
        todo_title: '',
        assigned_by: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/employee-tasks');
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Assign New Task</h1>
                            <Link 
                                href="/employee-tasks"
                                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                Back to List
                            </Link>
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                            {/* Date Field */}
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Date *
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    value={data.date}
                                    onChange={e => setData('date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.date && <div className="text-red-600 text-sm mt-1">{errors.date}</div>}
                            </div>

                            {/* Employee Name Field */}
                            <div>
                                <label htmlFor="employee_name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Employee Name *
                                </label>
                                <input
                                    type="text"
                                    id="employee_name"
                                    value={data.employee_name}
                                    onChange={e => setData('employee_name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter employee name"
                                />
                                {errors.employee_name && <div className="text-red-600 text-sm mt-1">{errors.employee_name}</div>}
                            </div>

                            {/* Designation Field */}
                            <div>
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation *
                                </label>
                                <input
                                    type="text"
                                    id="designation"
                                    value={data.designation}
                                    onChange={e => setData('designation', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter designation"
                                />
                                {errors.designation && <div className="text-red-600 text-sm mt-1">{errors.designation}</div>}
                            </div>

                            {/* To-Do Title Field */}
                            <div>
                                <label htmlFor="todo_title" className="block text-sm font-medium text-gray-700 mb-2">
                                    To-Do Title *
                                </label>
                                <input
                                    type="text"
                                    id="todo_title"
                                    value={data.todo_title}
                                    onChange={e => setData('todo_title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter task title"
                                />
                                {errors.todo_title && <div className="text-red-600 text-sm mt-1">{errors.todo_title}</div>}
                            </div>

                            {/* Assigned By Field */}
                            <div>
                                <label htmlFor="assigned_by" className="block text-sm font-medium text-gray-700 mb-2">
                                    Assigned By *
                                </label>
                                <input
                                    type="text"
                                    id="assigned_by"
                                    value={data.assigned_by}
                                    onChange={e => setData('assigned_by', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter assigner name"
                                />
                                {errors.assigned_by && <div className="text-red-600 text-sm mt-1">{errors.assigned_by}</div>}
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Creating...' : 'Create Task'}
                                </button>
                                <Link
                                    href="/employee-tasks"
                                    className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTasksCreate;