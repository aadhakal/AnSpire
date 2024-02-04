import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function AdvanceUser() {
  
  const [users, setUsers] = useState([]);
  const [advanceUsers, setAdvanceUser] = useState([])
  const location = useLocation()

  useEffect(() => {
    // Fetch the list of advance users from the server
    axios.get('http://localhost:8081/getAdvanceUser')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setAdvanceUser(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    // Fetch the list of regular users from the server
    axios.get('http://localhost:8081/getUser')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setUsers(res.data.Result);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePromoteUser = (id) => {
    console.log("Promote button clicked for user with ID:", id);
    axios.post(`http://localhost:8081/promoteUser/` + id)
      .then((res) => {
        console.log("PromoteUser response:", res.data);
        
        if (res.data.Status === 'Success') {
          location.replace(location);
        } else {
          alert('Error promoting user');
        }
      })
      .catch((err) => console.log(err));
  };
  
  const handleDemoteUser = (id) => {
    console.log("Demote button clicked for user with ID:", id);
    axios.post(`http://localhost:8081/demoteUser/` + id)
      .then((res) => {
        console.log("DemoteUser response:", res.data);
        if (res.data.Status === 'Success') {
          location.replace(location);
        } else {
          alert('Error demoting user');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='table-responsive'>
      <h1>Advanced User</h1>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {advanceUsers.map((advanceUser) => (
            <tr key={advanceUser.id}>
              <td>{advanceUser.id}</td>
              <td>{advanceUser.email}</td>
              <td>{advanceUser.role}</td>
              <td>
              <button onClick={() => handleDemoteUser(advanceUser.id)} className='btn btn-danger'>
                  Demote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>User</h1>
      <table className='table table-striped table-bordered table-hover'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handlePromoteUser(user.id)} className='btn btn-success'>
                  Promote
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdvanceUser;
