import React, { useState, useEffect } from 'react';
import { Button, List, Typography } from 'antd';

const { Text } = Typography;

function AddressCard(props) {
    const [nickname, setNickname] = useState("")

    const updateNickname = (addressId) => {
        let nickname = "마곡동"
        props.updateItem(addressId, nickname)
    }

    const renderItems = () => (
        props.addressItems && props.addressItems.map((address, index) => (
            <List.Item key={index}>
                <List.Item.Meta
                    title={address.nickname}
                    description={address.address_name}
                />
                <div>
                    <Button onClick={() => updateNickname(address._id)}>
                        Edit
                    </Button>
                    <Button onClick={() => props.removeItem(address._id)}>
                        Remove
                    </Button>
                </div>
            </List.Item>
        ))
    )

    return (
        <div>
            <List>
                {renderItems()}
            </List>
        </div>
    )
}

export default AddressCard
