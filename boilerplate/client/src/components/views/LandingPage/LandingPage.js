import React from 'react';
import Postcode from '../utils/Postcode';
import axios from 'axios';

function LandingPage(props) {
    const handleCoords = (addressInfo) => {
        if (addressInfo && addressInfo.x && addressInfo.y) {
            let body = {
                x: addressInfo.x,
                y: addressInfo.y,
                filters: "전체",
                searchTerm: ""
            }

            axios.post('/api/stores/getStores', body)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('localUser', JSON.stringify(body))
                    props.history.push('/store')
                }
                else {
                    alert("주소 검색에 실패했습니다")
                }
            })
        }
    }

    return (
        <Postcode handleCoords={addressInfo => handleCoords(addressInfo)} />
    )
}

export default LandingPage
