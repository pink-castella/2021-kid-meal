import React, { useEffect, useState } from 'react';
import { Container } from '../../style/styledDiv';
import { Tabs } from 'antd';
import ProductCard from './Sections/ProductCard';
import UsedProductCard from './Sections/UsedProductCard';

const { TabPane } = Tabs;

function MyPage(props) {
    const [HistoryInfo, setHistoryInfo] = useState([])
    const [usedHistoryInfo, setusedHistoryInfo] = useState([])
    
    
    useEffect(() => {
        let historyList = []
        let usedhistoryList = []

        if (props.user.userData && props.user.userData.history) {
            if (props.user.userData.history.length > 0) {
                props.user.userData.history.forEach(item => {
                    // 1day = 86,400,000ms
                    let dday = (item.expiredDate-Date.now()) / 86400000
                    let ddayItem = { dday: dday }
                    let obj = Object.assign({}, item, ddayItem)
                    if(item.used === 0){
                        historyList.push(obj)
                    } else{
                        usedhistoryList.push(obj)
                    }
                })
                setusedHistoryInfo(usedhistoryList)
                setHistoryInfo(historyList)
            }   
        }
    }, [props.user.userData])


    return (
        <Container>
            <Tabs defaultActiveKey="1">
            <TabPane tab="사용 가능" key="1">
               <ProductCard 
                history={HistoryInfo}
                user={props.user.userData}/>
            </TabPane>
            <TabPane tab="사용 완료" key="2">
                <UsedProductCard
                history={usedHistoryInfo}
                user={props.user.userData}/>
            </TabPane>
            </Tabs>
        </Container>       
    )
}

export default MyPage
