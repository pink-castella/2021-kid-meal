import React, { useEffect, useState } from 'react'
import { Empty, Col, Card, Row, Button, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';
import QrCode from './QrCode';
import KakaoShareButton from './KakaoShareButton'
import axios from 'axios';

function UsedProductCard(props) {
    
    const [History, setHistory] = useState([])
    const [CountCard, setCountCard] = useState(0)
    const [Detail, setDetail] = useState({})
   
    const [StoreInfo, setStoreInfo] = useState([])
    const [StoreName, setStoreName] = useState('')
    
    const [ProductInfo, setProductInfo] = useState([])
    const [Image, setImage] = useState([])  // 상품 사진 저장

    const [Modal2Visible, setModal2Visible] = useState(false)
    const [Loading, setLoading] = useState(false)
    
    useEffect(() => {
        setHistory(props.history)
        // product.used === 0 인 것만 띄워야 함
        setCountCard(props.history.length)

        let storeList= []
        let productList= []
        props.history && props.history.forEach(item => {

            let body = {
                store: item.storeId
            }

            axios.post(`/api/stores/getStoreInfo`, body)
                .then(response => {
                    storeList.push(response.data.storeInfo[0])
                })
                .catch(err => alert(err))

            
            // 사진을 가져온다.
            axios.get(`/api/products/products_by_id?id=${item.productId}&type=single`)
                .then(response => {
                    productList.push(response.data[0])
                })
        
        })
        setStoreInfo(storeList)
        setProductInfo(productList)

        
        // 이미지 저장
        let imageList = []
        props.history && props.history.forEach(item => {
            //console.log('>> item: ', item)
            ProductInfo && ProductInfo.some(info =>{
                //console.log('>> info: ', info)
                if(item.productId === info._id){
                    imageList.push(info.image)
                }
            })
        })
        setImage(imageList)             
        
    }, [props.history])

    const handleOk = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setModal2Visible(false)
        }, 500);
        //reivewModal 띄우기
    };
    
    const handleCancel = () => {
        setModal2Visible(false)
    };


    const convertDate = (milliSecond)=> {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const data = new Date(milliSecond);  //Date객체 생성
        
        const year = data.getFullYear();    //0000년 가져오기
        const month = data.getMonth() + 1;  //월은 0부터 시작하니 +1하기
        const date = data.getDate();        //일자 가져오기
        const day = days[data.getDay()];    //요일 가져오기
        
        return `${year}.${month}.${date}. (${day})`;
    }

    const renderCards = props.history && props.history.map((product, index) => { 
        const purchaseDay = convertDate(product.dateOfPurchase)
        const expiryDay = convertDate(product.expiredDate)
        console.log('product: ', product)
        return(
            <> 
            { Image &&
            <Col lg={6} md={8} xs={24} key={index}> 
                <Card            
                    cover={<img src={Image[index]} />}
                >
                    <Meta 
                        title={product.name}
                    />
                    <br/>
                    $ {product.price}
                    <br/>
                    결제일: {purchaseDay}
                    <br/>
                    사용일: {expiryDay}
                    <br/>
                    <br/>                                    
                </Card>
            </Col>
            }
        </>
        )
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
                <Empty description={'사용 완료한 상품이 없습니다.'}/>
            </>
            }

            { Detail && 
                <Modal
                    title="리뷰 작성하기"
                    centered
                    visible={Modal2Visible}
                    onOk={() =>setModal2Visible(false)}
                    onCancel={() =>setModal2Visible(false)}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            창 닫기
                        </Button>,
                        <Button key="download" loading={Loading} type="primary" onClick={ () => handleOk()}>
                            작성완료
                        </Button>
                    ]}
                > 
                    <h2> {StoreName} </h2>
                    {Detail.name}
                    <br/>
                    // 리뷰 별 rating       
                </Modal>
            }           
        </>
    )
}

export default UsedProductCard



