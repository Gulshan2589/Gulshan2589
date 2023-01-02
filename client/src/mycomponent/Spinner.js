import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

function Spinner() {
  return (
    <div className="spinner">
      <Spin  style={{color:'green'}} 
      indicator={antIcon} size='large'/>
    </div>
  );
}

export default Spinner;
