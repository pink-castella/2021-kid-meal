import React, { useEffect, useState } from 'react';

function Mypage() {
    const [historyInfo, setHistoryInfo] = useState([])
    
    useEffect = (() => {
        let historyList = []

        if (props.user.userData && props.user.userData.history) {
            if (props.user.userData.history.length > 0) {
                props.user.userData.history.forEach(item => {
                    // 1day = 86400000ms
                    let dday = (item.expiredDate-Date.now()) / 86400000
                    let ddayItem = { dday: dday }
                    let obj = Object.assign({}, item, ddayItem)
                    historyList.push(obj)
                })

                setHistoryInfo(historyList)
            }    
        }
    }, [props.user.userData])

    return (
        <div>
            <h1> Mypage </h1>
        </div>
    )
}

export default Mypage
