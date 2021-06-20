import React,{useState} from "react";
import {Link,useHistory} from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LoginUser from "../controller/login";
import { useContext } from 'react';
import jwt from 'jsonwebtoken'
import AppContext from './AppContext';


const LoginForm = () => {
  const myContext = useContext(AppContext);
   let [error,displayError] = useState(null);
   let history = useHistory()
  if(myContext.user!=null){
    history.push("/dashboard");
  }
  const onFinish = async (values) => {

   
    let data = await LoginUser(values);
    console.log(data);
    if(data.code===false){
      error = data.response;
      displayError(error);

  }
  else{
    displayError(" ");
    localStorage.setItem("token",data.token);
    let email = jwt.decode(data.token).email;
    myContext.setUser(email);
    history.push("/dashboard");
  }
  };

  return (
    <div className="coverBody">
      <div className="container">
          <h3 className="heading">Login</h3>

      <span className="error">{error===null?" ":error}</span>
    <Form
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
       
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" >
          Login
        </Button>
        <br />
      <label>Or</label><br/> <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
    </div>
    </div>
  );
};




export default LoginForm;