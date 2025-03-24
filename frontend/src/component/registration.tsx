import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration(props: any) {
    const navigate = useNavigate()

    interface Iuser {
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        role: string
    }

    const [formData, setFormData] = useState<Iuser>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = formData;
        console.log(formData);

        if (!firstName || !lastName || !email || !password) {
            setError("All fields are required!");
            return;
        }
        setError("");
        const response = await fetch('http://localhost:8000/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        )
        console.log(response);

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            navigate('/login');
        } else {
            const error = await response.json();
            alert(error.message)
        }

    };
    return (
        <div className='container'>
            <h2>Registration Form</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Role:
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;