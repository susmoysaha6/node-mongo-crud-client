import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AddUsers = () => {
    const [user, setUser] = useState({});
    const handleAddUser = e => {
        e.preventDefault();
        console.log(user);
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('user added successfully');
                    e.target.reset();
                }
            })
    }

    const handleInputBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser)
    }
    return (
        <div>
            <h2>Please Add a new user</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name="name" placeholder='name' />
                <br />
                <input onBlur={handleInputBlur} type="text" name="address" placeholder='address' />
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" placeholder='email' />
                <br />
                <button type="submit">Add User</button>
            </form>
            <Link to='/'>Home</Link>
        </div>
    );
};

export default AddUsers;