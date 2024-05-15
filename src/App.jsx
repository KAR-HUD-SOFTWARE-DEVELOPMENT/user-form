import React, {useState} from "react";
import { Form } from "./Form";

export const App = () => {

    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)

    const addUser = (newUser) => {
        setUsers([...users, ...newUser])
    }

    if (!showForm) {
        return ( 
            <div>
            <div>
            {users.length === 0 ? (
                    <div>User list is empty, you can add user.</div>
            ) : (
                <div>User list:</div>
                )}
                <ol>
                    {users.map((user, index) => (
                        <li key={index}>
                            {user.name} {user.surname}
                            <ul>
                                <li>{Object.keys(user)[2]}: {user.city}</li>
                                <li>{Object.keys(user)[3]}: {user.birthdate}</li>
                                <li>{Object.keys(user)[4]}: {user.gender}</li>
                            </ul>
                        </li>
                    ))}
                </ol>
            </div>
            <button onClick={() => setShowForm(true)}>Add User</button>
            </div>)
    }
    else {
        return <div>
            {showForm && <Form addUser={addUser} />}
            <button onClick={() => {setShowForm(false)}}>
                show user list
            </button>
        </div>
    }
} 