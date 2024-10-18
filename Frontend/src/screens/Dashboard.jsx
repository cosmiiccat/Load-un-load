import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Dashboard() {
  const fleetData = [
    { id: 1, vehicle: 'Truck', driver: 'Rahul Singh', status: 'Active', bookings: 5 },
    { id: 2, vehicle: 'Cargo Van', driver: 'Amit Sharma', status: 'Inactive', bookings: 7 },
    { id: 3, vehicle: 'Pickup Truck', driver: 'Priya Verma', status: 'Active', bookings: 12 },
    { id: 4, vehicle: 'Motorbike', driver: 'Vikram Das', status: 'Active', bookings: 6 },
  ];

  const analyticsData = {
    totalTrips: 120,
    avgTripTime: '45 mins',
    driverPerformance: [
      { driver: 'Rahul Singh', trips: 5, avgTime: '40 mins' },
      { driver: 'Amit Sharma', trips: 7, avgTime: '55 mins' },
      { driver: 'Priya Verma', trips: 12, avgTime: '35 mins' },
      { driver: 'Vikram Das', trips: 6, avgTime: '50 mins' },
    ],
  };

  const pieData = {
    labels: ['Rahul Singh', 'Amit Sharma', 'Priya Verma', 'Vikram Das'],
    datasets: [
      {
        data: [5, 7, 12, 6],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Trips Over Time',
        data: [5, 9, 12, 19, 28, 31],
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="dashboard-container p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="fleet-management bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Fleet Management</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Vehicle</th>
                <th className="px-4 py-2">Driver</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Bookings</th>
              </tr>
            </thead>
            <tbody>
              {fleetData.map((vehicle) => (
                <tr key={vehicle.id} className="text-center border-b">
                  <td className="px-4 py-2">{vehicle.vehicle}</td>
                  <td className="px-4 py-2">{vehicle.driver}</td>
                  <td className={`px-4 py-2 ${vehicle.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                    {vehicle.status}
                  </td>
                  <td className="px-4 py-2">{vehicle.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="data-analytics bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Data Analytics</h3>
          <div className="mb-6">
            <p className="mb-2">Total Trips Completed: <strong>{analyticsData.totalTrips}</strong></p>
            <p>Average Trip Time: <strong>{analyticsData.avgTripTime}</strong></p>
          </div>
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-4">Driver Performance Distribution</h4>
            <Pie className='max-h-96' data={pieData} />
          </div>
        </div>
      </div>

      <div className="trips-over-time bg-white p-6 shadow-md rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Trips Over Time</h3>
        <Line className='max-h-120' data={lineData} />
      </div>

      <div className="driver-performance bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Driver Performance</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Trips</th>
              <th className="px-4 py-2">Average Trip Time</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.driverPerformance.map((performance, index) => (
              <tr key={index} className="text-center border-b">
                <td className="px-4 py-2">{performance.driver}</td>
                <td className="px-4 py-2">{performance.trips}</td>
                <td className="px-4 py-2">{performance.avgTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
