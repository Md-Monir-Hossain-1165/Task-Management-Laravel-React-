import React from 'react';
import { Link, usePage } from '@inertiajs/react';

const Home = () => {
    const { auth, employee_tasks, all_employees } = usePage().props;

    // Use the tasks directly from controller (already filtered for today)
    const todaysTasks = employee_tasks || [];
    
    // Get unique employees with tasks today
    const employeesWithTasks = [...new Set(todaysTasks.map(task => 
        task.employee_name || (task.employee && task.employee.name)
    ))].filter(Boolean);
    
    // Use dynamic employee list from database or show empty state
    const allEmployees = all_employees || [];

    // Calculate stats safely
    const totalTasks = todaysTasks.length;
    const assignedEmployees = employeesWithTasks.length;
    const totalEmployees = allEmployees.length;
    const pendingEmployees = Math.max(0, totalEmployees - assignedEmployees);
    const completionRate = totalEmployees > 0 ? Math.round((assignedEmployees / totalEmployees) * 100) : 0;

    const stats = [
        { 
            label: "Today's Tasks", 
            value: totalTasks, 
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            icon: '📋',
            link: '/employee-tasks' 
        },
        { 
            label: 'Employees Assigned', 
            value: `${assignedEmployees}/${totalEmployees}`,
            color: 'bg-gradient-to-br from-green-500 to-green-600',
            icon: '✅',
            link: '/employees' 
        },
        { 
            label: 'Pending Assignment', 
            value: pendingEmployees,
            color: 'bg-gradient-to-br from-amber-500 to-amber-600',
            icon: '⏳',
            link: '/employee-tasks/create' 
        },
        { 
            label: 'Completion Rate', 
            value: `${completionRate}%`,
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            icon: '📊',
            link: '/reports' 
        },
    ];

    // Helper function to get employee display name
    const getEmployeeDisplayName = (employeeName) => {
        if (!employeeName) return 'Unknown Employee';
        
        if (typeof allEmployees[0] === 'string') {
            const employee = allEmployees.find(emp => 
                emp.startsWith(employeeName)
            );
            return employee || employeeName;
        }
        
        if (allEmployees[0] && typeof allEmployees[0] === 'object') {
            const employee = allEmployees.find(emp => 
                emp.name === employeeName || emp.id === employeeName
            );
            return employee ? `${employee.name} - ${employee.designation}` : employeeName;
        }
        
        return employeeName;
    };

    // Helper function to get tasks for an employee
    const getEmployeeTasks = (employeeName) => {
        return todaysTasks.filter(task => 
            task.employee_name === employeeName || 
            (task.employee && task.employee.name === employeeName)
        );
    };

    // Helper function to extract employee name from employee data
    const getEmployeeName = (employee) => {
        if (typeof employee === 'string') {
            return employee.split(' - ')[0];
        }
        if (employee && typeof employee === 'object') {
            return employee.name;
        }
        return employee;
    };

    // Helper function to get employee department
    const getEmployeeDepartment = (employee) => {
        if (typeof employee === 'string') {
            const parts = employee.split(' - ');
            return parts[1] || 'Not specified';
        }
        if (employee && typeof employee === 'object') {
            return employee.department || 'Not specified';
        }
        return 'Not specified';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            {/* Enhanced Header */}
            <header className="bg-white shadow-lg border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-xl">TM</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
                                <p className="text-sm text-gray-600 font-medium">Daily Task Assignment System</p>
                            </div>
                        </div>
                        
                        <nav className="hidden md:flex space-x-10">
                            <Link href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1 transition-colors">Dashboard</Link>
                            <Link href="/employees" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Employees</Link>
                            <Link href="/employee-tasks" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Tasks</Link>
                            <Link href="/reports" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reports</Link>
                        </nav>
                        
                        <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-3 rounded-2xl border border-blue-100">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-blue-200">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-blue-800 font-semibold text-sm">
                                {new Date().toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Enhanced Welcome Section */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center space-x-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200 mb-6">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-700">Live Dashboard</span>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Daily Task Overview
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Monitor task assignments and ensure every team member has their daily priorities set
                    </p>
                </div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, index) => (
                        <Link 
                            key={index} 
                            href={stat.link}
                            className="group transform transition-all duration-300 hover:scale-105"
                        >
                            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-3">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                                        <span className="text-2xl text-white">{stat.icon}</span>
                                    </div>
                                </div>
                                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full transition-all duration-1000 ${
                                            stat.color.split(' ')[0].replace('bg-gradient-to-br', 'bg')
                                        }`}
                                        style={{ 
                                            width: stat.label === 'Completion Rate' 
                                                ? `${completionRate}%` 
                                                : stat.label === 'Employees Assigned'
                                                ? `${(assignedEmployees / totalEmployees) * 100}%`
                                                : '100%'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Enhanced Employee Assignment Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Employees with Tasks */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-5 border-b border-green-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                                        <span className="text-white text-lg">✅</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Task Assigned</h3>
                                        <p className="text-sm text-green-700 font-medium">Employees with today's tasks</p>
                                    </div>
                                </div>
                                <span className="bg-green-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                                    {assignedEmployees}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {assignedEmployees > 0 ? (
                                employeesWithTasks.map((employeeName, index) => {
                                    const employeeTasks = getEmployeeTasks(employeeName);
                                    const displayName = getEmployeeDisplayName(employeeName);
                                    
                                    return (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-white rounded-xl border border-green-200 hover:border-green-300 transition-colors group">
                                            <div className="flex items-center space-x-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                                        <span className="text-green-600 font-semibold text-sm">
                                                            {employeeTasks.length}
                                                        </span>
                                                    </div>
                                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{displayName}</p>
                                                    <p className="text-sm text-gray-600">
                                                        {employeeTasks.length} task{employeeTasks.length !== 1 ? 's' : ''} assigned
                                                    </p>
                                                </div>
                                            </div>
                                            <Link 
                                                href="/employee-tasks"
                                                className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center space-x-1 transition-colors"
                                            >
                                                <span>View</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">📝</span>
                                    </div>
                                    <p className="text-gray-500 mb-4 font-medium">No tasks assigned today</p>
                                    <Link 
                                        href="/employee-tasks/create"
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold inline-block"
                                    >
                                        Assign First Task
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Employees without Tasks */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5 border-b border-amber-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-md">
                                        <span className="text-white text-lg">⏳</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">Awaiting Tasks</h3>
                                        <p className="text-sm text-amber-700 font-medium">Employees needing assignment</p>
                                    </div>
                                </div>
                                <span className="bg-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                                    {pendingEmployees}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {totalEmployees > 0 ? (
                                allEmployees
                                    .filter(employee => {
                                        const employeeName = getEmployeeName(employee);
                                        return !employeesWithTasks.includes(employeeName);
                                    })
                                    .map((employee, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-white rounded-xl border border-amber-200 hover:border-amber-300 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                                    <span className="text-amber-600 font-semibold">!</span>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {typeof employee === 'string' ? employee : `${employee.name}`}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {typeof employee === 'string' ? employee.split(' - ')[1] : employee.designation}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link 
                                                href="/employee-tasks/create"
                                                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                                            >
                                                Assign
                                            </Link>
                                        </div>
                                    ))
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">👥</span>
                                    </div>
                                    <p className="text-gray-500 mb-4 font-medium">No employees in system</p>
                                    <Link 
                                        href="/employees/create"
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold inline-block"
                                    >
                                        Add First Employee
                                    </Link>
                                </div>
                            )}
                            
                            {totalEmployees > 0 && pendingEmployees === 0 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">🎉</span>
                                    </div>
                                    <p className="text-green-600 font-bold text-lg">Perfect! All employees have tasks!</p>
                                    <p className="text-green-500 text-sm mt-2">Great work managing the team</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Enhanced All Employees List */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-12">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-blue-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                                    <span className="text-white text-lg">👥</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Team Overview</h3>
                                    <p className="text-sm text-blue-700 font-medium">Complete employee directory</p>
                                </div>
                            </div>
                            <span className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                                {totalEmployees} Employees
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {totalEmployees > 0 ? (
                                allEmployees.map((employee, index) => {
                                    const employeeName = getEmployeeName(employee);
                                    const employeeDepartment = getEmployeeDepartment(employee);
                                    const hasTaskToday = employeesWithTasks.includes(employeeName);
                                    
                                    return (
                                        <div key={index} className={`border-2 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg ${
                                            hasTaskToday 
                                                ? 'border-green-200 bg-gradient-to-br from-green-50 to-white' 
                                                : 'border-gray-200 bg-gradient-to-br from-gray-50 to-white'
                                        }`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-gray-900 text-lg">
                                                    {typeof employee === 'string' ? employee.split(' - ')[0] : employee.name}
                                                </h4>
                                                <div className={`w-3 h-3 rounded-full ${
                                                    hasTaskToday ? 'bg-green-500' : 'bg-gray-400'
                                                }`}></div>
                                            </div>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-500">💼</span>
                                                    <span className="text-gray-700 font-medium">
                                                        {typeof employee === 'string' ? employee.split(' - ')[1] : employee.designation}
                                                    </span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-gray-500">🏢</span>
                                                    <span className="text-gray-700">{employeeDepartment}</span>
                                                </div>
                                                {typeof employee === 'object' && employee.email && (
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-gray-500">✉️</span>
                                                        <span className="text-gray-700 truncate">{employee.email}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-5 flex justify-between items-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    hasTaskToday 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {hasTaskToday ? 'Assigned' : 'Pending'}
                                                </span>
                                                <Link 
                                                    href={`/employees/${typeof employee === 'object' ? employee.id : '#'}`}
                                                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center space-x-1 transition-colors"
                                                >
                                                    <span>Profile</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center py-12">
                                    <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <span className="text-4xl">👥</span>
                                    </div>
                                    <p className="text-gray-500 mb-6 font-medium text-lg">No team members added yet</p>
                                    <Link 
                                        href="/employees/create"
                                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-bold inline-block"
                                    >
                                        Build Your Team
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Enhanced Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Link 
                        href="/employee-tasks/create"
                        className="group transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all h-full">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Assign Tasks</h3>
                            <p className="text-blue-100 leading-relaxed">Create and distribute today's priority tasks to your team</p>
                        </div>
                    </Link>

                    <Link 
                        href="/employees"
                        className="group transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all h-full">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">👨‍💼</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Manage Team</h3>
                            <p className="text-green-100 leading-relaxed">Add team members and update employee information</p>
                        </div>
                    </Link>

                    <Link 
                        href="/reports"
                        className="group transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg hover:shadow-xl transition-all h-full">
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">📈</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">View Reports</h3>
                            <p className="text-purple-100 leading-relaxed">Analyze productivity trends and assignment history</p>
                        </div>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <span className="text-white font-bold text-xl">TM</span>
                        </div>
                        <h4 className="text-2xl font-bold mb-4">Task Management</h4>
                        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Streamlining daily task assignments and team management for modern organizations
                        </p>
                        <div className="mt-8 pt-8 border-t border-gray-700">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} Designed By Md Monir Hossain. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;