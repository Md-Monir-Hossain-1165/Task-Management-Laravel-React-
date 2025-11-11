import React from 'react';
import { Link } from '@inertiajs/react';

const ReportsIndex = () => {
    const reportData = {
        completionRate: 75,
        pendingTasks: 8,
        completedTasks: 24,
        overdueTasks: 3
    };

    const performanceData = [
        { employee: 'John Doe', completed: 15, pending: 2, efficiency: '95%' },
        { employee: 'Jane Smith', completed: 12, pending: 1, efficiency: '98%' },
        { employee: 'Mike Johnson', completed: 8, pending: 5, efficiency: '78%' },
    ];

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Generate Report
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-600 font-medium">Completion Rate</p>
                                <p className="text-2xl font-bold text-gray-900">{reportData.completionRate}%</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-yellow-600 font-medium">Pending Tasks</p>
                                <p className="text-2xl font-bold text-gray-900">{reportData.pendingTasks}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <p className="text-sm text-green-600 font-medium">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{reportData.completedTasks}</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <p className="text-sm text-red-600 font-medium">Overdue</p>
                                <p className="text-2xl font-bold text-gray-900">{reportData.overdueTasks}</p>
                            </div>
                        </div>

                        {/* Performance Table */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Employee Performance</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Efficiency</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {performanceData.map((emp, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{emp.employee}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.completed}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.pending}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{emp.efficiency}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsIndex;