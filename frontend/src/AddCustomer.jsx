import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddCustomer() {
	const [data, setData] = useState({
        ID: '',
		name: '',
		email: '',
		service_type: '',
        device_payment_plan: '',
        credit_card: '',
        credit_card_type: '',
        account_last_payment_date: '',
		address: '',
		state: '',
		postal_code: ''
	})
	const navigate = useNavigate()
	const [csvFile, setCsvFile] = useState(null)

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = {
			ID: data.ID,
			name: data.name,
			email: data.email,
			service_type: data.service_type,
			device_payment_plan: data.device_payment_plan,
			credit_card: data.credit_card,
			credit_card_type: data.credit_card_type,
			account_last_payment_date: data.account_last_payment_date,
			address: data.address,
			state: data.state,
			postal_code: data.postal_code
		};
		axios.post('http://localhost:8081/add', formdata)
		.then(res => {
			navigate('/customer')
		})
		.catch(err => console.log(err));
	}

	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Customer</h2>
			<form className ="row g-3 w-50" onSubmit={handleSubmit}>
            <div className ="col-12">
					<label htmlFor="inputID" className ="form-label">ID</label>
					<input type="text" className ="form-control" id="inputID" placeholder='Enter ID' autoComplete='off'
					onChange={e => setData({...data, ID: e.target.value})}/>
				</div>
			<div className ="col-12">
					<label htmlFor="inputName" className ="form-label">Name</label>
					<input type="text" className ="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div className ="col-12">
					<label htmlFor="inputEmail" className ="form-label">Email</label>
					<input type="email" className ="form-control" id="inputEmail" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})}/>
				</div>
				<div className ="col-12">
					<label htmlFor="inputServiceType" className ="form-label">Service Type</label>
					<input type="text" className ="form-control" id="inputServiceType" placeholder='Enter Service Type' autoComplete='off'
					 onChange={e => setData({...data, service_type: e.target.value})}/>
				</div>
				<div className ="col-12">
					<label htmlFor="inputDevicePaymentPlan" className ="form-label">Device Payment Plan</label>
					<input type="text" className ="form-control" id="inputDevicePaymentPlan" placeholder="Enter Device Payment Plan" autoComplete='off'
					onChange={e => setData({...data, device_payment_plan: e.target.value})}/>
				</div>
                <div className ="col-12">
					<label htmlFor="inputCreditCardNumber" className ="form-label">Credit Card Number</label>
					<input type="text" className ="form-control" id="inputCreditCardNumber" placeholder="Enter Credit Card Number" autoComplete='off'
					onChange={e => setData({...data, credit_card: e.target.value})}/>
				</div>
                <div className ="col-12">
					<label htmlFor="inputCreditCardType" className ="form-label">Credit Card Type</label>
					<input type="text" className ="form-control" id="inputCreditCardType" placeholder="Credit Card Type" autoComplete='off'
					onChange={e => setData({...data, credit_card_type: e.target.value})}/>
				</div>
                <div className ="col-12">
					<label htmlFor="inputAccountLastPaymentDate" className ="form-label">Account Last Payment Date</label>
					<input type="text" className ="form-control" id="inputAccountLastPaymentDate" placeholder="mm/dd/yyyy" autoComplete='off'
					onChange={e => setData({...data, account_last_payment_date: e.target.value})}/>
				</div>
				<div className ="col-12">
					<label htmlFor="inputAddress" className ="form-label">Address</label>
					<input type="text" className ="form-control" id="inputAddress" placeholder="1234 Main Street" autoComplete='off'
					onChange={e => setData({...data, address: e.target.value})}/>
				</div>
                <div className ="col-12">
					<label htmlFor="inputState" className ="form-label">State</label>
					<input type="text" className ="form-control" id="inputState" placeholder="Enter State" autoComplete='off'
					onChange={e => setData({...data, state: e.target.value})}/>
				</div>
                <div className ="col-12">
					<label htmlFor="inputPostalCode" className ="form-label">Postal Code</label>
					<input type="text" className ="form-control" id="inputPostalCode" placeholder="Enter Postal Code" autoComplete='off'
					onChange={e => setData({...data, postal_code: e.target.value})}/>
				</div>
				<div className ="col-12">
					<button type="submit" className ="btn btn-primary">Add</button>
				</div>
			</form>
		</div>
	)
}

export default AddCustomer