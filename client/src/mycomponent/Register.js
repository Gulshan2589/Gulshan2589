import { Form, message, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Resources/authentication.css";
import axios from "axios";
import Spinner from "./Spinner";

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {

    try {
      setLoading(true);
      await axios.post('/api/users/register', values);
      message.success("Registration Successfull");
      setLoading(false);
    } catch (error) {
      message.error('Registration Faield');
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
        <div className="col-md-5">
          <div className="lottie">
            <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_ksndox8l.json"
              background="transparent" speed="1" loop autoplay></lottie-player>
          </div>
        </div>
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Hisbook Register</h1>
            <hr />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
              <Link id="reglink" to="/login">Already Registered , Click Here To Login</Link>
              <button className="secondary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
