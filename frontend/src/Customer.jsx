import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'
import CSVUploadComponent from './CSVUploadComponent'

function Customer({ isDarkMode }) {
    const [data, setData] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [showCSVUpload, setShowCSVUpload] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8081/getCustomer')
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Result)
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }

    const filteredData = data.filter((customer) => {
        const searchString = searchQuery.toLowerCase().split(' ');
        return searchString.every((term) => {
            return (
                customer.ID.toLowerCase().includes(term) ||
                customer.name.toLowerCase().includes(term) ||
                customer.email.toLowerCase().includes(term) ||
                customer.device_payment_plan.toLowerCase().includes(term) ||
                customer.credit_card.toLowerCase().includes(term) ||
                customer.credit_card_type.toLowerCase().includes(term) ||
                customer.account_last_payment_date.toLowerCase().includes(term) ||
                customer.address.toLowerCase().includes(term) ||
                customer.state.toLowerCase().includes(term) ||
                customer.postal_code.toLowerCase().includes(term)
            );
        });
    });

    const generateCSV = (data) => {
        const headers = Object.keys(data[0]).join(',');
        const csv = data.map((customer) => Object.values(customer).join(',')).join('\n');
        return `${headers}\n${csv}`;
    };

    // Function to trigger CSV export
    const exportCSV = () => {
        const csvContent = generateCSV(searchQuery ? filteredData : data);
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'customer_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    return (
        <div className="px-5">
            <div className='search__container'>
                <div className='search__title'>
                    <input
                        className='search__input'
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="table-responsive">

                <div className="d-flex justify-content-between">
                    <Link to="/add" className='button-28 mb-3 mt-3'>Add Customer</Link>
                    <Link to="/CSVUploadComponent" className='button-28 mb-3 mt-3'>Upload CSV</Link>
                    <button className='button-29 mb-3 mt-3' onClick={exportCSV}>
                        Export CSV
                    </button>
                </div>


            </div>
            <div className="table-responsive">
            
            <table className={`table table-striped table-bordered table-hover ${isDarkMode ? 'table-dark' : 'table-light'}`}>
                  
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Device Payment Plan</th>
                            <th>Credit Card Number</th>
                            <th>Credit Card Type</th>
                            <th>Account Last Payment Date</th>
                            <th>Address</th>
                            <th>State</th>
                            <th>Postal Code</th>
                            <th className="Actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((customer, index) => {
                            return <tr key={index}>
                                <td>{customer.ID}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.device_payment_plan}</td>
                                <td>{customer.credit_card}</td>
                                <td>{customer.credit_card_type}</td>
                                <td>{formatDate(customer.account_last_payment_date)}</td>
                                <td>{customer.address}</td>
                                <td>{customer.state}</td>
                                <td>{customer.postal_code}</td>
                                <td >

                                    <Link to={`/editCustomer/` + customer.ID} className='button-44 mb-1'>
                                        Update
                                    </Link>

                                    <button onClick={e => handleDelete(customer.ID)} className='button-45'>
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        })}
                    </tbody>
                    
                </table>
                
            </div>
        </div>
    )
}

export default Customer