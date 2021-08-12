import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, List, Input, Icon} from 'antd';
import axios from 'axios';
import { setCurrentAddress } from '../../../../_actions/user_actions';


function AddressCard(props) {
    const dispatch = useDispatch();

    const [nickname, setNickname] = useState("")
    const [editing, setEditing] = useState([{addressId: "", edit: false}])
    
    const editItem = (addressId) => {
        setEditing({addressId: addressId, edit: true})
    }

    const saveItem = (addressId) => {
        props.updateItem(addressId, nickname)
        setEditing(false)
    }

    const handleChange = (event) => {
        setNickname(event.currentTarget.value)
    }

    const handleCurrentAddress = (addressInfo) => {
        let bodyForStore = {
            x: addressInfo.location[0].x,
            y: addressInfo.location[0].y,
            filters: "전체",
            searchTerm: ""
        }

        let bodyForCurrent = {
            x: addressInfo.location[0].x,
            y: addressInfo.location[0].y,
            address_name: addressInfo.address_name,
            nickname: addressInfo.nickname,
        }

        axios.post('/api/stores/getStores', bodyForStore)
        .then(response => {
            if (response.data.success) {
                dispatch(setCurrentAddress(bodyForCurrent))
                    .then(response => {
                        if (response.payload.success) {
                            props.history.push('/store')
                        }
                    })
            }
            else {
                alert("주소 검색에 실패했습니다")
            }
        })
    }
    
    const renderItems = () => (
        props.addressItems && props.addressItems.map((address, index) => (
            address._id === editing.addressId && editing.edit ? (
                <List.Item key={index}>                    
                    <Input value={nickname} onChange={handleChange} style={{ width: '30%', marginRight: '1rem' }}/>
                    <List.Item.Meta
                    description={address.address_name}
                    />
                    <div>
                        <Button type="primary" onClick={() => saveItem(address._id)}>
                            <Icon type="save" />
                        </Button>
                        <Button onClick={() => props.removeItem(address._id)}>
                            <Icon type="delete" />
                        </Button>
                    </div>
                </List.Item>
                ) : (
                <List.Item key={index}>       
                    <a onClick={() => handleCurrentAddress(address)}>               
                        <List.Item.Meta
                        title={<a onClick={() => handleCurrentAddress(address)}>{address.nickname}</a>}
                        description={address.address_name}
                        />
                    </a>
                    <div>
                        <Button onClick={() => editItem(address._id)}>
                            <Icon type="edit" />
                        </Button>
                        <Button type="primary" onClick={() => props.removeItem(address._id)}>
                            <Icon type="delete" />
                        </Button>
                    </div>                    
                </List.Item>
            )
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

export default withRouter(AddressCard)
