import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';
import Header from "../header/Header";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    function updateForm(value: { email: string; password: string; }) {
        return setForm((prev) => {
            return { ...prev, ...value };
        })
    }

    async function onLogin(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const login = { ...form };

        await fetch("http://localhost:5050/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        })
        .catch(() => {
            window.alert("invalid login");
            return;
        });

        setForm({ email: "", password: ""});
        navigate("/home");
    }


    return (
        <div className="Login">
            <Header/>
            <div>
            </div>
        </div>
    );
}

export default Login;
