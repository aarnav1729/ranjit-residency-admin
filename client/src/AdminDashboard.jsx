import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './AdminDashboard.css';

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('/reservations/list');
        setReservations(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const calculateStats = () => {
      const currentMonth = new Date().getMonth();
      const filteredReservations = reservations.filter(reservation => {
        const checkInMonth = new Date(reservation.checkInDate).getMonth();
        return checkInMonth === currentMonth;
      });

      setTotalBookings(filteredReservations.length);
      const revenue = filteredReservations.reduce((acc, reservation) => acc + (reservation.price || 0), 0);
      setTotalRevenue(revenue);
    };

    fetchReservations();
    calculateStats();
  }, [reservations]);

  const data = {
    labels: ['Occupied', 'Available'],
    datasets: [
      {
        data: [totalBookings, 100 - totalBookings],
        backgroundColor: ['#4299e1', '#f7fafc'],
      },
    ],
  };

  return (
    <div className="w-full mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="mb-8 flex justify-between items-center">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md w-1/2">
          <h3 className="text-lg font-semibold">Stats</h3>
          <p>Total Bookings: {totalBookings}</p>
          <p>Total Revenue: ₹{totalRevenue}</p>
        </div>
        <div className="w-1/2">
          <Pie data={data} />
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-md admin-table">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Check-In Date</th>
            <th className="py-2 px-4 border-b">Check-Out Date</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td className="py-2 px-4 border-b">{reservation.guestName}</td>
              <td className="py-2 px-4 border-b">{new Date(reservation.checkInDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">₹{reservation.price}</td>
              <td className="py-2 px-4 border-b">{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;