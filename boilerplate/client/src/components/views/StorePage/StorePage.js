import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StorePage() {
    const [stores, setStores] = useState([])

    useEffect(() => {
        getStores();
    }, [])

    const getStores = (body) => {
        axios.post('/api/stores/getStores', body)
        .then(response => {
            if (response.data.success) {
                setStores(response.data.productInfo)
            } else {
                alert("가게 정보를 가져오는데 실패했습니다.")
            }
        })
    }

    return (
        <div>
            StorePage
        </div>
    )
}

export default StorePage
