import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    const [id, setId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [money, setMoney] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.currentUser) {
            setIsEdit(true);
            setId(props.currentUser.id);
            setUserName(props.currentUser.userName);
            setPassword(props.currentUser.password);
            setMoney(props.currentUser.money);
        }
    }, []);

    const handleSave = () => {
        if (id.length !== 9 || isNaN(id) === true) {
            alert('id is wrong');
            return;
        } else if (password !== confirmPass) {
            alert('password doesnt match');
            return;
        }

        if (isEdit) {
            const editedUser = {
                id,
                userName,
                password,
                money,
                transactions: structuredClone(props.currentUser.transactions),
            };
            props.editUser(editedUser);
            navigate('/customerpage');
        } else {
            const newUser = {
                id,
                userName,
                password,
                money,
                transactions: [],
            };
            props.addUser(newUser);
            navigate('/');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1>{isEdit ? 'Edit' : 'Register'}</h1>
            <input type="text" value={id} onInput={(ev) => setId(ev.target.value)} />
            <input type="text" value={userName} onInput={(ev) => setUserName(ev.target.value)} />
            <input type="text" value={password} onInput={(ev) => setPassword(ev.target.value)} />
            <input type="text" value={confirmPass} onInput={(ev) => setConfirmPass(ev.target.value)} />
            <input type="text" value={money} onInput={(ev) => setMoney(ev.target.value)} />
            <button
                onClick={() => {
                    handleSave();
                }}
            >
                {isEdit ? 'SAVE' : 'CREATE'}
            </button>
        </div>
    );
}
