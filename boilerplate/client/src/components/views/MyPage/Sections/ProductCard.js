import React, { useEffect, useState } from 'react'
import { Empty, Col, Card, Row, Button, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';
import QrCode from './QrCode';
import KakaoShareButton from './KakaoShareButton'
import axios from 'axios';

function ProductCard(props) {
    
    const [History, setHistory] = useState([])
    const [CountCard, setCountCard] = useState(0)
    const [Detail, setDetail] = useState({})
   
    const [StoreInfo, setStoreInfo] = useState([])
    const [StoreName, setStoreName] = useState('')
    
    const [Modal2Visible, setModal2Visible] = useState(false)
    const [Loading, setLoading] = useState(false)
    
    useEffect(() => {
        
        setHistory(props.history)
        setCountCard(props.history.length)

        let storeList= []
        props.history && props.history.forEach(item => {

            let body = {
                store: item.storeId
            }

            axios.post(`/api/stores/getStoreInfo`, body)
                .then(response => {
                    storeList.push(response.data.storeInfo[0])
                })
                .catch(err => alert(err))
        })

        setStoreInfo(storeList)
        
    }, [props.history])


    const handleOk = (paymentId, StoreIdforSoldCheck) => {

        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setModal2Visible(false)
        }, 500);
        
        let body = {
            id: paymentId
        }

        let store_body = {
            storeId: StoreIdforSoldCheck
        }

    
        // 서버에 사용완료 알리기 
        axios.post('/api/users/successUse', body)
    
        axios.post('/api/stores/updateStoreSold', store_body)
            .then(response => {
                console.log('response.data: ', response.data)
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    setModal2Visible(false)
                }, 500);
                props.history.push('/store')
            })
            .catch(err => alert(err))

        
    };
    
    const handleCancel = () => {
        setModal2Visible(false)
    };

    const showDetail = (buyId) => {     // 클릭한 구매건 고유id
        setModal2Visible(true)

        History.forEach(item => {
            if(item.id === buyId){
         // if (Object.values(item).indexOf(buyId) > -1) {
                setDetail(item)     //클릭한 것의 상품 정보를 Detail에 다 담는다.
                StoreInfo.some(info => {
                    if(item.storeId === info._id){
                        setStoreName(info.storeName)
                    }
                })
            }
        })
    }

    const convertDate = (milliSecond)=> {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const data = new Date(milliSecond);  //Date객체 생성
        
        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
        const day = days[data.getDay()];    //요일 가져오기
        
        return `${year}.${month}.${date}. (${day})`;
    }

    const calculateDay = (dday) => {
        if (Math.round(dday) === 0){
            return 'D-day'
        }else{
            return `D-${Math.round(dday)}`
        }   
    }


    const renderCards = props.history && props.history.map((product, index) => { 
        const purchaseDay = convertDate(product.dateOfPurchase)
        const expiryDay = convertDate(product.expiredDate)
     
        return <Col lg={6} md={8} xs={24} key={index}> 
                <Card            
                    cover={<img src={product.productImg} />}
                >
                    <Meta 
                        title={product.name}
                    />
                    <br/>
                    $ {product.price}
                    <br/>
                    결제일: {purchaseDay}
                    <br/>
                    만료일: {expiryDay}
                    <br/>
                    {calculateDay(product.dday)}
                    <br/>

                    <br/>
                    <Button type="primary" onClick={ () => showDetail(product.id)}>
                        상품권 공유하기
                    </Button>
                                    
                </Card>
            </Col>
                
        })

    return (
        <>
            {   CountCard > 0 ?
            <div style={{ width: '75%', margin: '3rem auto'}}>
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>
                <br />
            </div>
            :
            <>
                <br />
                <br />
                <Empty description={'사용 가능한 결제 완료 상품이 없습니다.'}/>
            </>
            }

            { Detail && 
                <Modal
                    title="상품권 공유하기"
                    centered
                    visible={Modal2Visible}
                    onOk={() =>setModal2Visible(false)}
                    onCancel={() =>setModal2Visible(false)}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            창 닫기
                        </Button>,
                        <Button key="download" loading={Loading} type="primary" onClick={ () => handleOk(Detail.id, Detail.storeId)}>
                            사용 완료
                        </Button>
                    ]}
                > 
                    <h2> {StoreName} </h2>
                    {Detail.name}
                    <br/>
                    {Detail.price} 원
                    <div>
                        <QrCode id={Detail.id}/>
                    </div>
                    <br/>
                    <div className="layout">
                        <KakaoShareButton />
                    </div>
                    <br/>           
                </Modal>
            }           
        </>
    )
}

export default ProductCard

