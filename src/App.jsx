import React, {useState} from "react";
import { Form } from "./Form";

export const App = () => {

    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)

    const addUser = (newUser) => {
        setUsers([...users, newUser])
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
                            {user[1]} {user[3]}
                            <ul>
                                <li>{user[4]}: {user[5]}</li>
                                <li>{user[6]}: {user[7]}</li>
                                <li>{user[8]}: {user[9]}</li>
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