import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
    const StoredUser = useLoaderData();
    const [user, setUser] = useState(StoredUser);
    const handleUpdateUser = e => {
        e.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${StoredUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user update');
                }
            })

    }

    const handleInputChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newUser = { ...user }
        newUser[field] = value;
        setUser(newUser)
    }

    return (
        <div>
            <h1>Please Update:{StoredUser.name}</h1>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange}
                    defaultValue={StoredUser.name} type="text" name="name" placeholder='name' />
                <br />
                <input onChange={handleInputChange}
                    defaultValue={StoredUser.address}
                    type="text" name="address" placeholder='address' />
                <br />
                <input onChange={handleInputChange}
                    defaultValue={StoredUser.email}
                    type="email" name="email" placeholder='email' />
                <br />
                <button type="submit">Update User</button>
            </form>
            <Link to='/'>Home</Link>
            <Link to='/users/add' >Add User</Link>
        </div>
    );
};

export default Update;