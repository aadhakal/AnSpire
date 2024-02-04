import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

function CustomerDetail() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/getCustomer')
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Result.recordset)
                    setData(res.data.Result.recordset);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Customer List</h3>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Service Type</th>
                            <th>Device Payment Plan</th>
                            <th>Credit Card Number</th>
                            <th>Credit Card Type</th>
                            <th>Account Last Payment Date</th>
                            <th>Address</th>
                            <th>State</th>
                            <th>Postal Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((customer, index) => {
                            return <tr key={index}>
                                <td>{customer.ID}</td>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.serviceType}</td>
                                <td>{customer.devicePaymentPlan}</td>
                                <td>{customer.creditCardNumber}</td>
                                <td>{customer.creditCardType}</td>
                                <td>{customer.accountLastPaymentDate}</td>
                                <td>{customer.address}</td>
                                <td>{customer.state}</td>
                                <td>{customer.postalCode}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerDetail