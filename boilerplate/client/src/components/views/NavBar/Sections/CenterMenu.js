import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Dropdown, message, Icon} from 'antd';
import { useSelector, useStore } from "react-redux";
import { Link } from 'react-router-dom'

function CenterMenu() {
    const user = useSelector(state => state.user)
    const [cuurrentName, setcuurrentName] = useState('')
    const [NickName, setNickName] = useState([])
    const [userAddress, setuserAddress] = useState([])
    
    useEffect(() => {
        if (user.userData && user.userData.isAuth) {
            setcuurrentName(user.userData.currentAddress.nickname)
            setuserAddress(user.userData.address)
        }
    }, [user.userData])

    const itemClick = ({ key }) => {
        setcuurrentName(`item ${key}`)
        //message.info(`Click on item ${key}`);
        // 클릭하면 주소 닉네임이 바뀐다
        // 페이지를 이동해도 마지막 선택한 것으로 저장 되어야 하는데 !
    };          
        
    

    const menu = (
        <Menu onClick={itemClick}>
          <Menu.Item key="1">1st menu item</Menu.Item>
        </Menu>
    );
    /* 초기화 되었으면 ? renderCards : menu
    */

    
   

    if (user.userData && user.userData.isAuth) {
        console.log(cuurrentName)
        console.log(userAddress.length)
    
        const renderCards = userAddress.map((address, index) => { 
            return(
                <Menu onClick={itemClick}>
                    <Menu.item key={index}>{`${address.nickname}`}</Menu.item>
                </Menu>
            )   
        })

        return (
            <div>
                { userAddress.length > 1 ?
                    <Dropdown overlay={renderCards}>
                        <Link to="/address"
                            className="ant-dropdown-link">
                            {cuurrentName} <Icon type="down" />
                        </Link>
                    </Dropdown>
                    :
                    <Link to="/address">
                        {cuurrentName}
                    </Link>                     
                }               
                
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





