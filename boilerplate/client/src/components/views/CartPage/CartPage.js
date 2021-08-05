import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock'
import { Empty } from 'antd';
import axios from 'axios'
import { Container } from '../../style/styledDiv';


function CartPage(props) {   

    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)       // 가격 표시

    useEffect(() => {
        
        let cartItems=[]

        if(props.user.userData && props.user.userData.cart){

            if(props.user.userData.cart.length >0){
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.productId)                 // cartItems은 cart 객체에 담긴 요소들의 id를 담는 배열 
                })
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then(response => {calculateTotal(response.payload)}) 
            }
        }
        
    }, [props.user.userData])


    const calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10)* item.quantity
        })
        setTotal(total)
        setShowTotal(true)                 
    }

    let removeFromCart = (productId) =>{
        dispatch(removeCartItem(productId))     
            .then(response => { 
                if(response.payload.productInfo.length <= 0){
                    setShowTotal(false)            // 가격 표시X
                }
            })
    }

    return (
        <Container>
            <h1>My Cart</h1>

            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>

            {ShowTotal ? 
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total Amount: ${Total}</h2>
                </div>
                :
                <>
                    <br />
                    <Empty description={false}/>
                </>
            }

        </Container>
    )
}

export default CartPage
