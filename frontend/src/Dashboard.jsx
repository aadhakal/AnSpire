import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './style.css'


function Dashboard({ isDarkMode, toggleDarkMode }) {
	const navigate = useNavigate()
	axios.defaults.withCredentials = true;
	useEffect(() => {
		axios.get('http://localhost:8081/dashboard')
			.then(res => {
				if (res.data.Status === "Success") {
					if (res.data.role === "admin") {
						navigate('/');
					} else {
						const id = res.data.id;
						navigate('/customerDetail/' + id)
					}
				} else {
					navigate('/start')
				}
			})
	}, [])

	const handleLogout = () => {
		axios.get('http://localhost:8081/logout')
			.then(res => {
				navigate('/start')
			}).catch(err => console.log(err));
	}

	return (
		<div className={`container-fluid ${isDarkMode ? 'dark-mode' : ''}`}>
			<div className="row flex-nowrap">
				<div className="container-fluid">
					<div className="row flex-nowrap">
						<div className="col-auto col-md-3 col-xl-2 d-flex flex-column w-auto px-2 px-sm-0 bg-dark">
							<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white min-vh-100">
								<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
									<span className="fs-4 fw-bold d-none d-sm-inline">Dashboard</span>
								</a>
								<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
									<li>
										<Link to="/home" className="nav-link text-white px-0 align-middle">
											<i className="fs-4 bi-speedometer2 me-2"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
										</Link>
									</li>
									<li>
										<Link to="/advanceUser" className="nav-link text-white px-0 align-middle">
											<i className="fs-4 bi-people me-2"></i> <span className="ms-1 d-none d-sm-inline">User</span>
										</Link>
									</li>
									<li>
										<Link to='/customer' className="nav-link px-0 align-middle text-white">
											<i className="fs-4 bi-person me-2"></i> <span className="ms-1 d-none d-sm-inline">Customer</span>
										</Link>
									</li>
									<li onClick={handleLogout}>
										<a href="#" className="nav-link px-0 align-middle text-white">
											<i className="fs-4 bi-power me-2"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col p-0 m-0">
							<div className='p-3 d-flex justify-content-between align-items-center shadow'>
								<h4 className="text-center mb-0 flex-grow-1">Customers Management System</h4>
								<div className='mode-button'>
									<button onClick={toggleDarkMode} className="btn btn-dark">
										{isDarkMode ? 'Light Mode' : 'Dark Mode'}
									</button>
								</div>
							</div>
							<Outlet />
						</div>



					</div>
				</div>
			</div>
		</div>
	)




}

export default Dashboard