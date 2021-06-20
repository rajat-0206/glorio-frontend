import { React, useState } from "react";
import { Card, Col, Row, Badge, Modal, Typography, Button, Spin } from 'antd';
import axios from "axios";
import { build } from "joi";
import openNotification from "./notification";
import jwt from 'jsonwebtoken'
const { Text, Title } = Typography;

const hasElement = (arr,ele) =>{
  let flag = 0;
  arr.forEach(element => {
      if(element.slot==ele){
          flag = 1;
      }
  });
  if(flag==1){
    return true
  }
  else{
    return false
  }
  
}


const HomePage = () => {
  let [modalVisible, setModalVisible] = useState(false)
  let [modalValue, setModalValue] = useState(null)
  let [building,setBuilding] = useState(null);
  let [slot,setSlot] = useState(null);
  let [buildingData,setbuildingData] = useState([]);


  let [loading, changeLoading] = useState(true);
  var main = "";


  let build =async () => {
    if (loading) {
      try {
        setbuildingData(JSON.parse(localStorage.getItem("buildings")));
        
        changeLoading(false);
      } catch (e) {
      }
    }
  }
  const showModal = (name, slot, value = true) => {
    setBuilding(name);
    setSlot(slot);
    setModalValue(value);
    setModalVisible(true);
  }

  const parkCar = async(name, slotno) => {
    let token = localStorage.getItem("token")
    let response = await axios.post("https://gloiriobackend.herokuapp.com/parkcar", {
      "building": name,
      "slot": slotno,
    },{headers: { Authorization: `Bearer ${token}` }});


    if(response.data.code==true){
      openNotification("Park",response.data.response)
      let data = await axios.get("https://gloiriobackend.herokuapp.com/dashboard",{headers: { Authorization: `Bearer ${token}` }});
      data = data.data.buildings;
      localStorage.removeItem("buildings");
      localStorage.setItem("buildings",JSON.stringify(data));
      setbuildingData(data);

  }
  else{
     openNotification("Error","Failed to park car. Please try later")
  }
  setModalVisible(false);
  }

  const unparkCar = async (name,slot) => {
    let ObjectId = "";
    let token = localStorage.getItem("token")
    let data = jwt.decode(token)
    let email = data.email;
    data = JSON.parse(localStorage.getItem("buildings"));
    data.forEach(element => {
      if(element.name===name){
        element.filled.forEach(ele =>{
            if(Number(ele.slot)===Number(slot) && ele.user===email){
                ObjectId = ele.id;
            }
        })
      }
    });
    if(ObjectId==""){
      openNotification("Park","This car is not yours so you cannot unpark this car");
      return ;
    }
    let response = await axios.post("https://gloiriobackend.herokuapp.com/unparkcar", {
      "bookingid": ObjectId,
    },{headers: { Authorization: `Bearer ${token}` }});

    if(response.data.code==true){
      openNotification("Park",response.data.response)
      let data = await axios.get("https://gloiriobackend.herokuapp.com/dashboard",{headers: { Authorization: `Bearer ${token}` }});
      data = data.data.buildings;
      localStorage.removeItem("buildings");
      localStorage.setItem("buildings",JSON.stringify(data));
      setbuildingData(data);

  }
  else{
     openNotification("Error",response.data.response)
  }
  setModalVisible(false);
  }

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const buildBadge = (name, num, filled = []) => {
    let avail = []

    for (let i = 1; i <= num; i++) {
      if (hasElement(filled,i)) {
        avail.push(<Badge count={i} size="large" onClick={() => showModal(name, i, false)} className="slotbatch" key={i} />)
      }
      else {
        avail.push(<Badge count={i} size="large" onClick={() => showModal(name, i, true)} className="available slotbatch" key={i} style={{ backgroundColor: '#52c41a' }} />)
      }
    }
    return <div className="buildingCard">{avail}</div>;
  }

  let Cards = () => {
    let buildings = [];
    buildings = buildingData.map((ele) => {
      return (
      <Col span={8}>
        <Card title={ele.name} bordered={false}>
          Total SLot :{ele.total_slots}
          Available Slot:{ele.available_slots}
          {buildBadge(ele.name, ele.total_slots, ele.filled)}
        </Card>
      </Col>
      )
    })
    return (
      <div className="site-card-wrapper">
        < Row gutter={16} >
          {buildings}
        </Row >
        <Modal title="Slot Status" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Typography >
            <Text size="large" style={{ "fontSize": "24px", "margin": "0px auto" }}>{building} {slot}</Text>
            <div className="navbar" style={{ "margin-top": "24px" }}>
              <Text>{modalValue ? "This slot is available to park" : "This slot has a car already parked"}</Text>
              {modalValue ? <Button type="primary" className="actionBtn" size="small" onClick={() => parkCar(building, slot)} >Park here</Button> : <Button type="danger" className="actionBtn" size="small" onClick={() => unparkCar(building, slot)} >Unpark Car</Button>}
            </div>
          </Typography>
        </Modal>
      </div>
    )
  }



  build()
  return (<div>{loading ? <Spin size="large" className="displayMiddle" /> :<Cards />}</div>)
};

export default HomePage;