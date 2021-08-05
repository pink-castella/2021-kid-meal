import React, { useEffect, useState } from 'react'
import { Empty, Col, Card, Row, Button, Modal } from 'antd';
import Meta from 'antd/lib/card/Meta';
import BarcodeItemScreen from './QrCode';
import QrCode from './QrCode';

function UsedProductCard(props) {
    
    const [CountCard, setCountCard] = useState(0)
    const [Image, setImage] = useState('')

    const [Modal2Visible, setModal2Visible] = useState(false)

    
    useEffect(() => {
        
        let count = 0
        if (props.user.userData && props.user.userData.history) {
            if (props.user.userData.history.length > 0) {
                props.user.userData.history.forEach(item => {
                    if(item.used === 1) {
                        count ++
                    } 
                })
                setCountCard(count)
            }   
        }
        
    }, [props.history])

    const handleOk = () => {
        setTimeout(() => {
            setModal2Visible(false)
        }, 1500);
    };
    
    const handleCancel = () => {
        setModal2Visible(false)
    };

    const ReviewModal = (product) => {
        // console.log('ReivewModal 진입, product:  ', product)
        console.log(product.name)
        return <div>
            <Button type="primary" onClick={ () => setModal2Visible(true)}>
                리뷰 작성하기
            </Button>
            <Modal
                title="Review"
                centered
                visible={Modal2Visible}
                onOk={() =>setModal2Visible(false)}
                onCancel={() =>setModal2Visible(false)}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        창 닫기
                    </Button>,
                    <Button key="download" type="primary" onClick={handleOk}>
                        다운받기
                    </Button>,
                    
                ]}
            > 
                <h2> {product.name} </h2>
                <div>
                    <QrCode id={product.id}/>
                </div>
                <p> 왜 안뜨나요 ! </p>
                
            </Modal>
        </div>
    }

    
    const renderCards = props.history && props.history.map((product, index) => { 
        if(product.used === 1){
            return <Col lg={6} md={8} xs={24} key={index}> 
            <Card            
                cover={<a href={`/product/${product.productId}`}>
                        <img style={{ width: '100%', maxHeight: '150px'}} 
                src={product.image}/></a>}
                >
                <Meta 
                    title={product.name}
                    description={`$${product.price} 사용일: ${product.dateOfPurchase}`}   // 가격
                />
                <br/>
                <br/>
                <ReviewModal product={product}/>                   
            </Card>
        </Col>
        }        
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
                <Empty description={'결제 완료 후 사용한 상품이 없습니다.'}/>
                
            </>
            }

            
        </>
    )
}

export default UsedProductCard

