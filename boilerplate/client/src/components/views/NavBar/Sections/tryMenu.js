

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Dropdown, message, Icon} from 'antd';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'

function CenterMenu() {
    const user = useSelector(state => state.user)
    const [NickName, setNickName] = useState('')
    
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

    const menu = (
        <Menu onClick={itemClick}>
            <Menu.Item key="1">{userAddress[1].nickname}</Menu.Item>
            <Menu.Item key="2">{userAddress[2].nickname}</Menu.Item>
            <Menu.Item key="3">{userAddress[3].nickname}</Menu.Item>
        </Menu>
    );

    
    useEffect(() => {
        if (user.userData && user.userData.isAuth){
            setNickName(user.userData.currentAddress.nickname)
        }
    }, [user.userData])

    if (user.userData && user.userData.isAuth) {
        return (
            <div>
                <Dropdown overlay={menu}>
                    <Link to="/address"
                        className="ant-dropdown-link">
                    {NickName} <Icon type="down" />
                    </Link>
                </Dropdown>
            </div>
        )
    } else{
        return (
            <div>
                {null}
            </div>
        )
    }
}

export default CenterMenu

const renderCards = userAddress.map((address, index) => { 
    return( 
        <Menu onClick={itemClick}>
            <Menu.item key={index}>{address.nickname}</Menu.item>
        </Menu>
    )   
})

const renderItems = () => (
    user.userData && user.userData.address.map((address, index) => (
        <Menu.item key={index}>
            {address.nickname}
        </Menu.item>
    ))
)



{ userAddress.length > 1 ?
    <Dropdown overlay={renderCards}>
        <Link to="/address"
            className="ant-dropdown-link">
            {cuurrentName} <Icon type="down" />
        </Link>
    </Dropdown>
    :
    
}

const renderCards = userAddress.map((address, index) => { 
    return( 
        <Menu onClick={itemClick}>
            <Menu.item key={index}>{address.nickname}</Menu.item>
        </Menu>
    )   
})

const check = userAddress.map((address, index) => { 
    console.log(address.nickname) 
})