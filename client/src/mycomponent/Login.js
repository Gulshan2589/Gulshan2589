import { Form, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Resources/authentication.css";
import axios from "axios";
import Spinner from "./Spinner";

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', values);
            localStorage.setItem("Hisabbook-user", JSON.stringify({ ...response.data, Password: '' }));
            message.success("Login Successful");
            setLoading(false);
            navigate("/");
        } catch (error) {
            message.error('Login Faield');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("Hisabbook-user")) {
            navigate("/");
        }
    }, []);

    return (
        <div className="register">
            {loading && <Spinner />}
            <div className="row justify-content-center align-items-center w-100 h-100">
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>Hisbook Login</h1>
                        <hr />
                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type="password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link id="reglink" to="/register">Not Registered Yet, Click Here To Register</Link>
                            <button className="secondary" type="submit">
                                Login
                            </button>
                        </div>
                    </Form>
                </div>
                <div className="col-md-5">
                    <div className="lottie">
                        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_ksndox8l.json"
                            background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
