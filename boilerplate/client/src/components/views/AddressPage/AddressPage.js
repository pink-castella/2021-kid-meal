import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Postcode from '../utils/Postcode';
import { Typography, List } from 'antd';
import { addAddress, removeAddress, updateAddress } from '../../../_actions/user_actions';
import AddressCard from './Sections/AddressCard';

const { Title } = Typography;

function AddressPage(props) {
    const dispatch = useDispatch();
    const [addressInfo, setAddressInfo] = useState([])
    
    useEffect(() => {
        let addressList = []

        if (props.user.userData && props.user.userData.address) {
            if (props.user.userData.address.length > 0) {
                props.user.userData.address.forEach(item => {
                    addressList.push(item) // 수정
                })

                console.log('address: '+JSON.stringify(addressList));
                setAddressInfo(addressList)
            }
        }

    }, [props.user.userData])

    const handleCoords = (body) => {
        console.log('body'+JSON.stringify(body))
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
        .then(response => {
            console.log('remove: '+JSON.stringify(response))
        })
    }

    return (
        <>
            <Postcode handleCoords={body => handleCoords(body)} />
            <Title level={3}>저장된 주소</Title>
            <AddressCard 
                addressItems={addressInfo} 
                removeItem={addressId => removeAddressItem(addressId)}
                updateItem={(addressId, update) => updateAddressItem(addressId, update)}    
            />
        </>
    )
}

export default AddressPage
