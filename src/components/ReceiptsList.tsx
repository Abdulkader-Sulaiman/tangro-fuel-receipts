import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ReactVirtualizedTable() {
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(
          'https://tangro-demo-api.vercel.app/api/receipts',
          {
            headers: {
              Authorization: 'Bearer clhvmqzc30000mj082nqj2neu',
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setReceipts(data);
          setFilteredReceipts(data);
          console.log('Receipts:', data);
        } else if (response.status === 401) {
          // Handle unauthorized error
          console.log('Authorization Token is missing or faulty.');
        } else {
          // Handle other error cases
          console.log('Error occurred while fetching receipts.');
        }
      } catch (error) {
        console.log('Error occurred while fetching receipts:', error);
      }
    };

    fetchReceipts();
  }, []);

  useEffect(() => {
    const filteredData = receipts.filter((receipt) =>
      receipt.vehicle.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredReceipts(filteredData);
  }, [receipts, searchName]);

  return (
    <div>
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search by Car name"
        style={{
          padding: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minWidth: '90%',
          marginBottom: '20px',
        }}
      />

      <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Odometer</TableCell>
              <TableCell>Liters</TableCell>
              <TableCell>Price Per Liter</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReceipts.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>{receipt.date}</TableCell>
                <TableCell>{receipt.odometer}</TableCell>
                <TableCell>{receipt.liters}</TableCell>
                <TableCell>{receipt.pricePerLiter}</TableCell>
                <TableCell>{receipt.vehicle.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
