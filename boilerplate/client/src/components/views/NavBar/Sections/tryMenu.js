/*
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

const renderCards = userAddress.map((address, index) => { 
    return <React.Fragment>
            <Menu onClick={itemClick}>
                <Menu.item key={index}>{address.nickname}</Menu.item>
            </Menu>
         </React.Fragment>
})

const renderCards = userAddress && userAddress.map((address, index) => { 
    console.log(address.nickname)
    console.log(typeof(address.nickname))       //string
    return <Menu.item key={index}>
                {address.nickname}
            </Menu.item>
})

const check = userAddress.map((address, index) => { 
    console.log(address.nickname) 
})


const menu = (
    <Menu onClick={itemClick}>
        {userAddress && userAddress.map((address, index) => { 
            return <Menu.item key={index}>{address.nickname}</Menu.item>      
        })}
    </Menu>
);     


// push
function createItems() {
    let items = [];         
    for (let i = 0; i <= userAddress.length; i++) {             
         items.push(<Menu.item key={i} value={i}>{i}</Menu.item>);   
         //here I will be creating my options dynamically based on
         //what props are currently passed to the parent component
    }
    return items;
}  

const menu = (
    <Menu onClick={itemClick}>
        {createItems()}
    </Menu>
);     


/////////디버깅 시도한 것/////////
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Menu, Dropdown, message, Icon} from 'antd';
import { useSelector, useStore } from "react-redux";
import { withRouter, Link } from 'react-router-dom'

function CenterMenu() {
    const user = useSelector(state => state.user)
    const [currentName, setcurrentName] = useState('주소 선택하기')
    const [NickName, setNickName] = useState([])
    const [userAddress, setuserAddress] = useState([])
    
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

    const itemClick = ({ key }) => {
        setcurrentName(`item ${key}`)
        //message.info(`Click on item ${key}`);
        // 클릭하면 주소 닉네임이 바뀐다
        // 페이지를 이동해도 마지막 선택한 것으로 저장 되어야 하는데 !
    }; 


    if (user.userData && user.userData.isAuth) {
       // console.log(currentName)
        // console.log(userAddress.length)
        // console.log(userAddress[1].nickname)
        
        function createItems(useraddress) {
            return (
                useraddress.map((address, index) => 
                    <Menu.item key={index}>{address.nickname}</Menu.item>)
            );
        }

        const menu = (
            <Menu onClick={itemClick}>
                {createItems(userAddress)}
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

*/
