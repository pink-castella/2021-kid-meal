import React, { useEffect, useState } from 'react';
import { Container } from '../../style/styledDiv';
import { Tabs } from 'antd';
import ProductCard from './Sections/ProductCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions';

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

//---------------------------------------------------
/*
    const dispatch = useDispatch();

    useEffect(() => {
        
        let cartItems=[]

        if(props.user.userData && props.user.userData.cart){

            if(props.user.userData.cart.length >0){
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.productId)                 // cartItems은 cart 객체에 담긴 요소들의 id를 담는 배열 
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
        
    }, [props.user.userData])

*/
    //--------------------
    const callback = (key) => {
        console.log(key);
      }
      //<ProductCard history={} />
    return (
        <Container>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="사용 가능" key="1">
                <ProductCard history={historyInfo}/>
                </TabPane>
                <TabPane tab="사용 완료" key="2">
                Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </Container>
    )
}

export default MyPage
