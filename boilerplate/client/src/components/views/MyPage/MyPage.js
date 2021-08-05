import React, { useEffect, useState } from 'react';
import { Container } from '../../style/styledDiv';
import { Tabs } from 'antd';
import ProductCard from './Sections/ProductCard';
import UsedProductCard from './Sections/UsedProductCard';

const { TabPane } = Tabs;

function MyPage(props) {
    const [historyInfo, setHistoryInfo] = useState([])
    
    
    useEffect(() => {
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


    const callback = (key) => {
        console.log(key);
    }

    return (
        <Container>
            <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="사용 가능" key="1">
               <ProductCard 
                history={historyInfo}
                user={props.user.userData}/>
            </TabPane>
            <TabPane tab="사용 완료" key="2">
                <UsedProductCard
                history={historyInfo}
                user={props.user.userData}/>
            </TabPane>
            </Tabs>
        </Container>       
    )
}

export default MyPage
