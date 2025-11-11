import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const EmployeeTasksIndex = () => {
    const { tasks, flash } = usePage().props;

    // Calculate stats
    const totalTasks = tasks?.length || 0;
    const todayTasks = tasks?.filter(task => 
        new Date(task.date).toDateString() === new Date().toDateString()
    ).length || 0;
    const uniqueEmployees = new Set(tasks?.map(task => task.employee_name)).size;
    const completedTasks = tasks?.filter(task => task.status === 'completed').length || 0;

    const stats = [
        { 
            label: "Total Tasks", 
            value: totalTasks,
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
            icon: "📋"
        },
        { 
            label: "Today's Tasks", 
            value: todayTasks,
            color: "bg-gradient-to-r from-green-500 to-green-600",
            icon: "🕐"
        },
        { 
            label: "Employees", 
            value: uniqueEmployees,
            color: "bg-gradient-to-r from-purple-500 to-purple-600",
            icon: "👥"
        },
        { 
            label: "Completed", 
            value: completedTasks,
            color: "bg-gradient-to-r from-emerald-500 to-emerald-600",
            icon: "✅"
        }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            in_progress: { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
            completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
            overdue: { color: 'bg-red-100 text-red-800', label: 'Overdue' }
        };
        
        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const isToday = (date) => {
        return new Date(date).toDateString() === new Date().toDateString();
    };

    const isOverdue = (date) => {
        return new Date(date) < new Date() && !isToday(date);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="mb-6 lg:mb-0">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        Task Management
                                    </h1>
                                    <p className="text-gray-600 font-medium">Monitor and manage employee assignments</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex space-x-4">
                            <Link 
                                href="/employee-tasks/create"
                                className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Assign New Task</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                {flash && flash.success && (
                    <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-green-800 font-semibold">Success!</p>
                                <p className="text-green-700">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Overview */}
                {tasks && tasks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${stat.color}`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tasks Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="px-6 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-0">All Assignments</h2>
                            <div className="flex space-x-3">
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                                    Filter
                                </button>
                                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
                                    Sort
                                </button>
                            </div>
                        </div>

                        {tasks && tasks.length > 0 ? (
                            <div className="overflow-hidden rounded-xl border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Task Details
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Employee
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Date & Status
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tasks.map((task) => {
                                            const today = isToday(task.date);
                                            const overdue = isOverdue(task.date);
                                            
                                            return (
                                                <tr key={task.id} className="hover:bg-gray-50 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-start space-x-3">
                                                            <div className={`w-3 h-3 rounded-full mt-2 ${
                                                                today ? 'bg-green-500' : 
                                                                overdue ? 'bg-red-500' : 'bg-blue-500'
                                                            }`}></div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                                    {task.todo_title}
                                                                </h4>
                                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                                    {task.todo_description || 'No description provided'}
                                                                </p>
                                                                <div className="flex items-center space-x-2 mt-2">
                                                                    <span className="text-xs text-gray-500">Assigned by:</span>
                                                                    <span className="text-xs font-medium text-gray-700">{task.assigned_by}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <p className="font-medium text-gray-900">{task.employee_name}</p>
                                                            <p className="text-sm text-gray-600">{task.designation}</p>
                                                            {task.department && (
                                                                <p className="text-xs text-gray-500 mt-1">{task.department}</p>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="space-y-2">
                                                            <div className="flex items-center space-x-2">
                                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                <span className={`text-sm font-medium ${
                                                                    today ? 'text-green-600' : 
                                                                    overdue ? 'text-red-600' : 'text-gray-600'
                                                                }`}>
                                                                    {new Date(task.date).toLocaleDateString('en-US', {
                                                                        weekday: 'short',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })}
                                                                    {today && ' (Today)'}
                                                                    {overdue && ' (Overdue)'}
                                                                </span>
                                                            </div>
                                                            {getStatusBadge(task.status || 'pending')}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex space-x-3">
                                                            <Link
                                                                href={`/employee-tasks/${task.id}`}
                                                                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm flex items-center space-x-2 group/view"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                                <span>View</span>
                                                            </Link>
                                                            <Link
                                                                href={`/employee-tasks/${task.id}/edit`}
                                                                className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm flex items-center space-x-2 group/edit"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                </svg>
                                                                <span>Edit</span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Tasks Assigned</h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                    Start managing your team's workload by assigning their first task. Track progress and ensure productivity.
                                </p>
                                <Link 
                                    href="/employee-tasks/create"
                                    className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-bold inline-flex items-center space-x-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Assign First Task</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                {tasks && tasks.length > 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-1">Need to manage tasks?</h4>
                                <p className="text-gray-600 text-sm">Quick actions to streamline task management</p>
                            </div>
                            <div className="flex space-x-4">
                                <Link 
                                    href="/employee-tasks/create"
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                                >
                                    Assign New Task
                                </Link>
                                <Link 
                                    href="/reports"
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm"
                                >
                                    View Reports
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeTasksIndex;