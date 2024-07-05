import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservationForm.css'

function ReservationForm() {
  const [guestName, setGuestName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [price, setPrice] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);

  // Fetch available room IDs when the component mounts
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        if (checkInDate && checkOutDate) {
          const response = await axios.get('/reservations/available-rooms', {
            params: {
              checkInDate,
              checkOutDate,
            },
          });
          setAvailableRooms(response.data);
        } else {
          setAvailableRooms([]); // Clear available rooms if dates are not selected
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailableRooms();
  }, [checkInDate, checkOutDate]);

  const handleCreateReservation = async () => {
    try {
      const response = await axios.post('/reservations/create', {
        guestName,
        address,
        mobileNumber,
        age,
        occupation,
        checkInDate,
        checkOutDate,
        roomId, // Use the _id of the selected room
        price,
      });
      console.log(response.data);
  
      // Refresh the page after a successful reservation creation
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reservation Form</h2>
      <div className="bg-white shadow-md rounded px-16 pt-10 pb-12 mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="guestName">
            Guest Name
          </label>
          <input
            id="guestName"
            type="text"
            placeholder="Guest Name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="text"
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            id="age"
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="occupation">
            Occupation
          </label>
          <input
            id="occupation"
            type="text"
            placeholder="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkInDate">
            Check-In Date
          </label>
          <input
            id="checkInDate"
            type="date"
            placeholder="Check-In Date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-12" htmlFor="checkOutDate">
            Check-Out Date
          </label>
          <input
            id="checkOutDate"
            type="date"
            placeholder="Check-Out Date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="roomId">
            Room
          </label>
          <select
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border rounded-md p-2 w-full"
          >
            <option value="">Select a room</option>
            {availableRooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.roomNumber} - {room.roomType}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-md p-12 w-full"
          />
        </div>
        <br />
        <div className="text-center">
          <button
            onClick={handleCreateReservation}
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full w-full"
          >
            Create Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationForm;