import { React, useState, useContext } from "react";
import { Layout, Menu, Spin, Button, Tooltip, Typography, Statistic, Col, Divider, Modal, Form, Input,notification } from 'antd';
import { useHistory } from "react-router-dom";
import HistoryPage from "./HistoryPage";
import HomePage from "./HomePage";
import { HomeOutlined, HistoryOutlined, LogoutOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";
import AppContext from './AppContext';
import openNotification from "./notification";
const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;


const Dashboard = () => {
    let history = useHistory();
    const myContext = useContext(AppContext);
    let [loading,changeLoading] = useState(true);
    let [Username,setname] = useState(null)
    let [balance,setbalance] = useState(null)


    const getData = async () => {
        if(loading){
            let token = localStorage.getItem("token");
        let data = await axios.get("https://gloiriobackend.herokuapp.com/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
        });
        Username = setname(data.data.user.name);
        localStorage.setItem("buildings",JSON.stringify(data.data.buildings));
        balance = setbalance(data.data.user.balance);
        changeLoading(false);
    }
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [homeVisible, setIsHomeVisible] = useState(true);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showHome = ()=>{
        setIsHomeVisible(true);
    }

    const showHistory = ()=>{
        setIsHomeVisible(false);
    }

    const handleOk = () => {
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = async () => {
        let token = localStorage.getItem("token");
        let amount = document.getElementById("amount").value;
        let response = await axios.post('https://gloiriobackend.herokuapp.com/addbalance',{
            "amount":amount
        },{headers: { Authorization: `Bearer ${token}` }});
        if(response.data.code==true){
            openNotification("Add Amount",`₹ ${amount} has been added to your wallet`)
            setbalance(Number(balance)+Number(amount));
        }
        else{
           openNotification("Error","Failed to add money. Please try later")
        }
        document.getElementById("amount").value = "";
        setIsModalVisible(false);

    }

    const logout = () => {
        localStorage.clear("token");
        myContext.setUser(null);
        history.push("/")

    }
    
    let mainlayout = (
        <Layout>
            <Header className="navbar" style={{ position: 'fixed', zIndex: 1, width: '100%', height: "65px" }}>
                <span className="companyName">Car Paking System</span>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={showHome}><HomeOutlined /> Home</Menu.Item>
                    <Menu.Item key="2"  onClick={showHistory}><HistoryOutlined /> History</Menu.Item>
                </Menu>
                <div>
                    <Tooltip placement="leftBottom" title="Add Balance">
                        <Button type="primary" className="actionBtn" onClick={showModal} icon={<PlusCircleOutlined />} size="large" />
                    </Tooltip>
                    <Tooltip placement="leftBottom" title="Logout">
                        <Button type="danger" className="actionBtn" onClick={logout} icon={<LogoutOutlined />} size="large" />
                    </Tooltip>
                </div>
            </Header>
            <Content className="site-layout mainsec" style={{ padding: '0 50px', marginTop: 64 }}>
                <div className="site-layout-background navbar" style={{ padding: 24 }}>
                    <Typography style={{ "float": "left" }}>
                        <Title> <UserOutlined /> {Username}</Title>
                        <center><Text className="centerText">Charges for parking are ₹ 100 for 1<super>st</super> hour and ₹ 60 for subsequent hours.</Text></center>
                    </Typography>
                    <Col>
                        <Statistic title="Account Balance" value={`₹ ${balance}`} precision={2} />
                    </Col>
                </div>
                <Divider />
                {homeVisible? <HomePage  />:<HistoryPage/>}
               
                
                <Modal title="Add Balance" visible={isModalVisible} onOk={onFinish} onCancel={handleCancel}>
                    <Form
                        className="modal-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >

                        <Form.Item
                            name="Amount"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the amount to be added!',
                                },
                            ]}
                        >
                            <Input id="amount" type="Number" min="0" placeholder="Amouunt" />
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
            <Footer style={{ textAlign: 'center', height: "40px" }}>©2021 Created by Rajat Shrivastava</Footer>
        </Layout>
    )
    getData()
    return  (<div>{loading ?  <Spin size="large" className="displayMiddle" /> : mainlayout}</div>)
    
}

export default Dashboard;