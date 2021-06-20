import { Link,useHistory} from "react-router-dom";
import {useState,useContext} from 'react';
import { Form, Input, Checkbox, Button} from 'antd';
import createUser from "../controller/signup";
import openNotification from "./notification";
import AppContext from './AppContext'


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const SignupForm = () => {
    const [form] = Form.useForm();
    const myContext = useContext(AppContext);
   let [error,displayError] = useState(null);
   let history = useHistory()
  if(myContext.user!=null){
    history.push("/dashboard");
  }
    const onFinish = async (values) => {

    let data = await createUser(values);
    if(data.code===false){
      error = data.response;
      displayError(error);
  }
  else{
    displayError(" ");
    openNotification("Register",data.response)
    setTimeout(() => {
    history.push("/");
        
    }, 1000);
  }
    };

    return (
        <div className="coverBody">
        <div className="container">
        <h3 className="heading">Register</h3>
        <span className="error">{error===null?" ":error}</span>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item
                name="name"
                label="Name"
                tooltip="What is your Name?"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                        whitespace: true,
                    },
                ]}
            >
                <Input type="text" placeholder="Name"/>
            </Form.Item>


            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the agreement.
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
                <br /><br/>
        <label>Aleadry have an account </label><br/> <Link to="/">Login</Link>
            </Form.Item>
        </Form>
        </div>
        </div>
    );
};






export default SignupForm;