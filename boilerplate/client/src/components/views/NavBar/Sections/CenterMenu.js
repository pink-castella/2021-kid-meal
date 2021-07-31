import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Dropdown, message, Icon} from 'antd';
import { useSelector, useDispatch, useStore } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import { setCurrentAddress } from '../../../../_actions/user_actions';


function CenterMenu() {
    const user = useSelector(state => state.user)
    const [currentName, setcurrentName] = useState('주소 선택하기')
    const [userAddress, setuserAddress] = useState([])
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (user.userData && user.userData.isAuth) {
            if(user.userData.currentAddress.nickname){       
                // 저장된 주소가 하나 이상 있을 때
                setcurrentName(user.userData.currentAddress.nickname)
                console.log(currentName)
            }
            setuserAddress(user.userData.address)
        }
    }, [user.userData])

    const itemClick = ( address ) => {
        setcurrentName(address.nickname)
        // currentAddress도 바꿔줘야 함
        let bodyForCurrent = {
            x: address.location[0].x,
            y: address.location[0].y,
            address_name:  address.address_name,
            nickname:  address.nickname,
        }
        dispatch(setCurrentAddress(bodyForCurrent))    
    }; 

    if (user.userData && user.userData.isAuth) {

        const renderItems = userAddress && userAddress.map((address, index) => { 
            return (
                <option key={index} onClick={()=>itemClick(address)}>
                    {address.nickname}
                </option>
            )
        })

        const menu = (
            <Menu>
                {renderItems}
            </Menu>
        );    

        return (
            <div>
                { userAddress.length > 1 ?
                    <Dropdown overlay={menu}>
                        <Link to="/address"
                            className="ant-dropdown-link">
                            {currentName} <Icon type="down" />
                        </Link>
                    </Dropdown>
                    :
                    <Link to="/address">
                        {currentName}
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


export default withRouter(CenterMenu)





