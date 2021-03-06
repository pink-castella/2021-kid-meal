import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock'
import { Empty, Modal, Button, Form, Input } from 'antd';
import KakaoPay from '../../utils/KakaoPay';
import { Container } from '../../style/styledDiv';


function CartPage(props) {   

    const dispatch = useDispatch();

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)       // 가격 표시
    const [Modal2Visible, setModal2Visible] = useState(false)

    const [Loading, setLoading] = useState(false)
    const [InputSave, setInputSave] = useState(false)

    const [Name, setName] = useState("")
    const [Phone, setPhone] = useState('')
    const [CheckPhone, setCheckPhone] = useState(false)

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
    
    const handleCancel = () => {
        //setState({ visible: false });
        setModal2Visible(false)
      };

    

    const titleChangeHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const numberChangeHandler = (event) => {
        setPhone(event.currentTarget.value)
    }

    const checkPhonenumber = (e) => {
        // 숫자만 입력 시
        // var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
        
        var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        
        if(regExp.test(e.target.value)){
            setCheckPhone(true)
        }
    }

    
    const submitHandler = (e) => {
        e.preventDefault();        // 확인 버튼 누를 때 페이지 refresh 되는 것 방지

        if(!Name || !Phone){
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }
        else{
            if(!CheckPhone){
                return alert(" 올바른 휴대폰 번호를 입력해주세요. \n (01x-xxxx-xxxx)")
            }
            else{
                setLoading(true)
                setInputSave(true)
                alert('주문자 정보가 저장되었습니다.')
            }
        }
    }

    return (
        <Container>
            <h1>My Cart</h1>

            <div>
                <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>

            {ShowTotal ? 
                <>
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total Amount: ${Total}</h2>
                </div>
                <div>
                    <Button type="primary" onClick={ () => setModal2Visible(true)}>
                        주문하기
                    </Button>
                    <Modal
                        title="주문자 정보 입력하기"
                        centered
                        visible={Modal2Visible}
                        onOk={() =>setModal2Visible(false)}
                        onCancel={() =>setModal2Visible(false)}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Return
                            </Button>,
                            
                            <KakaoPay
                                isSave={InputSave}
                                loading={Loading} 
                                user={props.user}
                                total ={Total}
                                name = {Name}
                                phone = {Phone} />
                        ]}
                    >   
                        <h2>주문 금액: $ {Total} </h2>
                        <p></p>
                        <p></p>
                        <Form onSubmit={submitHandler}>
                            <label>주문자 이름</label>
                            <Input onChange={titleChangeHandler} value={Name}/>
                            
                            <label>휴대폰 번호</label>
                            <Input type='text' onChange={numberChangeHandler} onBlur={checkPhonenumber}
                                value={Phone} placeholder='01x-xxxx-xxxx' />
                            <br />
                            <br />
                            <Button  htmlType="submit">
                                주문 정보 저장
                            </Button>
                        </Form>
                    </Modal>
                </div>
                </>
                :
                <>
                    <br />
                    <br />
                    <Empty description={'장바구니에 담긴 상품이 없습니다.'}/>
                </>
            }

        </Container>
    )
}

export default React.memo(CartPage)
