import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';


function UserForm({ handleSubmit, nameProp }) {
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [role, setRole] = React.useState('');

    const validateForm = () => {
        if (!username || !email || !password || !phoneNumber || !address || !role) {
            Toastify({
                text: "All fields are required",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold",
                },
            }).showToast();
            return false;
        }
        return true;
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row grid grid-cols-2 gap-4">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{nameProp}</h1>
                    <br />
                    <h1 className="text-5xl font-bold">Register</h1>
                    <br />
                    <h3 className="text-2xl font-bold">Create an account</h3>
                    <p className="py-6">
                        Fill in the form to create a new account.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form
                        className="card-body"
                        onSubmit={(e) => {
                            if (validateForm()) {
                                handleSubmit(e, username, email, password, phoneNumber, address, role);
                            }
                        }}
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="username"
                                className="input input-bordered"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="phone number"
                                className="input input-bordered"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="address"
                                className="input input-bordered"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select
                                className="select select-bordered"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function AddUser({ url }) {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            Toastify({
                text: 'You need to log in first',
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'left',
                stopOnFocus: true,
                style: {
                    background: '#EF4C54',
                    color: '#17202A',
                    boxShadow: '0 5px 10px black',
                    fontWeight: 'bold',
                },
            }).showToast();
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e, username, email, password, phoneNumber, address, role) => {
        e.preventDefault();
        const user = { username, email, password, phoneNumber, address, role };
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post(`${url}/add-user`, user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            Toastify({
                text: 'User added successfully',
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'left',
                stopOnFocus: true,
                style: {
                    background: '#00B29F',
                    color: '#17202A',
                    boxShadow: '0 5px 10px black',
                    fontWeight: 'bold',
                },
            }).showToast();
            navigate('/');
        } catch (error) {
            Toastify({
                text: error.message,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'left',
                stopOnFocus: true,
                style: {
                    background: '#EF4C54',
                    color: '#17202A',
                    boxShadow: '0 5px 10px black',
                    fontWeight: 'bold',
                },
            }).showToast();
        }
    };

    return (
        <UserForm handleSubmit={handleSubmit} nameProp="Add User" />
    );
}

export default AddUser;

