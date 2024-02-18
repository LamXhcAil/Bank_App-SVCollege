import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (userName === 'ADMIN' && password === 'ADMIN') {
            navigate('/bankpage');
        } else {
            const user = props.getUser(userName, password);
            if (user) {
                props.setUser(user);
                navigate(`/${user.userName}`);
            } else {
                alert('Wrong username or password');
            }
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>SV - BANK</h1>
            <input onInput={(ev) => setUserName(ev.target.value)} placeholder="User Name" type="text" />
            <input onInput={(ev) => setPassword(ev.target.value)} placeholder="Password" type="text" />
            <Link to="/register">create new user</Link>
            <button
                onClick={() => {
                    handleLogin();
                }}
            >
                Enter
            </button>
        </div>
    );
}
