import React from 'react';
import Postcode from '../utils/Postcode';
import axios from 'axios';

function LandingPage(props) {
    const handleCoords = (body) => {
        if (body && body.x && body.y) {
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
        <Postcode handleCoords={body => handleCoords(body)} />
    )
}

export default LandingPage
