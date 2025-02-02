import React from 'react';
import { ChartBarIcon, BookOpenIcon, PencilIcon, ClockIcon } from '@heroicons/react/24/outline';

const DashboardManagement = () => {
  // Temporary stats data - replace with your actual data
  const stats = [
    { id: 1, name: 'Total Words', value: '45,320', icon: PencilIcon, change: '+12.5%', changeType: 'positive' },
    { id: 2, name: 'Chapters Written', value: '18', icon: BookOpenIcon, change: '+2', changeType: 'positive' },
    { id: 3, name: 'Daily Goal', value: '85%', icon: ChartBarIcon, change: '15% to go', changeType: 'neutral' },
    { id: 4, name: 'Writing Streak', value: '27 days', icon: ClockIcon, change: '+3 days', changeType: 'positive' },
  ];

  return (
    <div className="min-h-screen overflow-x-auto bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Writing Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`mt-2 text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <stat.icon className="h-12 w-12 text-indigo-600" aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Writing Progress Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Writing Progress</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Chart placeholder</span>
            </div>
          </div>

          {/* Recent Chapters */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Recent Chapters</h2>
            <div className="flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="py-4 hover:bg-gray-50 px-2 rounded">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Chapter {i}</h3>
                        <p className="text-sm text-gray-500">Last edited 2 days ago</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">1,234 words</p>
                        <p className="text-sm text-green-600">Complete</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Daily Goals Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Daily Writing Goal</h2>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: '85%' }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">850/1000 words written</p>
            </div>
            <button className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Update Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardManagement;