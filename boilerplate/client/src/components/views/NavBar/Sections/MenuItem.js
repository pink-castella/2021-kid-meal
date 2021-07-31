import React, {useState} from 'react'
import {Menu} from 'antd'

function MenuItem(props) {
    const [NickName, setNickName] = useState('')

    const itemClick = ({ key }) => {
        setNickName(`item ${key}`)
        //message.info(`Click on item ${key}`);
        // 클릭하면 주소 닉네임이 바뀐다
        // 페이지를 이동해도 마지막 선택한 것으로 저장 되어야 하는데 !
    };

    const renderItems = () => (
        props.address.map((address, index) => (
            <Menu.item key={index}>
                {address.nickname}
            </Menu.item>
        ))
    )

    return (
        <Menu onClick={itemClick}>
            {renderItems()}
        </Menu>
    )
}

export default MenuItem
