import { React,useState} from "react";
import { Table, Spin} from 'antd';
import axios from "axios";
import e from "cors";

const HistoryPage = () => {

  let [columns,setColumn] = useState(null);

    const loadData = async() =>{
      let data = "";
      if(!columns){
        let token = localStorage.getItem("token");
     data = await axios.get("https://gloiriobackend.herokuapp.com/history",{
        headers: { Authorization: `Bearer ${token}` }
    });
    let tempColumn =data.data.response ;
    setColumn(tempColumn);
  }
    }

    

    const columnName = [
        {
            title: 'Booking Id',
            dataIndex: '_id',
            key: 'id',
          },
          {
            title: 'Parked On',
            dataIndex: 'parking_time',
            key: 'parking_time',
          },
          {
            title: 'Unparked On',
            dataIndex: 'unpark_time',
            key: 'unpark_time',
          },
          {
            title: 'Slot',
            dataIndex: 'slot',
            key: 'slot',
          },
          {
            title: 'Cost',
            dataIndex: 'charges',
            key: 'charges',
          },
          
    ]

    loadData()
    return  (<div>{columns==null?  <Spin size="large" className="displayMiddle" /> : <Table  dataSource={columns} columns={columnName} />}</div>)
}

export default HistoryPage;