import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Postcode from '../utils/Postcode';
import { Typography } from 'antd';
import { addAddress, removeAddress, updateAddress } from '../../../_actions/user_actions';
import AddressCard from './Sections/AddressCard';

const { Title } = Typography;

function AddressPage(props) {
    const dispatch = useDispatch();
    const [addressInfo, setAddressInfo] = useState([])
    
    useEffect(() => {
        if (props.user.userData && props.user.userData.address) {
            setAddressInfo(props.user.userData.address)
        }

    }, [props.user.userData])

    const handleCoords = (body) => {
        if (body && body.x && body.y && body.address_name) {
            dispatch(addAddress(body))
            .then(response => {
                console.log(response)
            })
        }
    }

    const updateAddressItem = (addressId, update) => {
        dispatch(updateAddress(addressId, update))
    }

    const removeAddressItem = (addressId) => {
        dispatch(removeAddress(addressId))
    }

    return (
        <React.Fragment>
            <Postcode handleCoords={body => handleCoords(body)} />
            <Title level={3}>저장된 주소</Title>
            <AddressCard 
                addressItems={addressInfo} 
                removeItem={addressId => removeAddressItem(addressId)}
                updateItem={(addressId, update) => updateAddressItem(addressId, update)}    
            />
        </React.Fragment>
    )
}

export default AddressPage
