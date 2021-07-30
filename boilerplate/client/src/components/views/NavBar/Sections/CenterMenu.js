import React, { useState } from 'react'
import axios from 'axios'
import { Menu, Dropdown, message, Icon} from 'antd';
import { Link } from 'react-router-dom'

function CenterMenu() {
    const [NickName, setNickName] = useState("예나미술학원")

    const itemClick = ({ key }) => {
        setNickName(`item ${key}`)
        //message.info(`Click on item ${key}`);
        // 클릭하면 주소 닉네임이 바뀐다
        // 페이지를 이동해도 마지막 선택한 것으로 저장 되어야 하는데 !
    };

    const menu = (
        <Menu onClick={itemClick}>
            <Menu.Item key="1">1st menu item</Menu.Item>
            <Menu.Item key="2">2nd menu item</Menu.Item>
            <Menu.Item key="3">3rd menu item</Menu.Item>
        </Menu>
    );

    
    return (
        <Dropdown overlay={menu}>
            <Link to="/"
                className="ant-dropdown-link">
            {NickName} <Icon type="down" />
            </Link>
        </Dropdown>
    )
}

export default CenterMenu





