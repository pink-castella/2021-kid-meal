import React, { useEffect, useState } from 'react'
import { Empty, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

function ProductCard(props) {
    console.log('왓: ', props.history.length)
    
    const [CountCard, setCountCard] = useState(0)
    useEffect(() => {
        setCountCard(props.history.length)
    }, [props.history])
    

    const renderCards = props.history && props.history.map((product, index) => { 
        
        /* 큰 화면(lg)일 때 하나는 6size(한 줄에 4개), 
        제일 작은 화면(xs)일 때 하나는 24size(한 줄에 1개) */
        console.log('>>> mypage_history: ', product)
        return <Col lg={6} md={8} xs={24} key={index}> 
            <Card            
                cover={<a href={`/product/${product.productId}`}>
                        <img style={{ width: '100%', maxHeight: '150px'}} 
                src={product.image}/></a>}
                >
                <Meta 
                    title={product.title}
                    description={`$${product.price}`}   // 가격
                />
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
                <Empty description={false}/>
            </>
            }
        </>
    )
}

export default ProductCard