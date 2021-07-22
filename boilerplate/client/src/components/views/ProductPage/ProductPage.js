import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Card, Row, Typography, Collapse, Tabs } from 'antd';
import MenuTab from './Sections/MenuTab';
import ReviewTab from './Sections/ReviewTab';
import InfoTab from './Sections/InfoTab';

const { Text } = Typography;
const { TabPane } = Tabs;


function ProductPage(props) {
    const storeId = props.match.params.storeId
    const [products, setProducts] = useState([])
    const [storeInfo, setStoreInfo] = useState()

    useEffect(() => {   
        let body = { 
            store: storeId
        }

        axios.post(`/api/stores/getProducts`, body)
        .then(response => {
            setProducts(response.data.productInfo)
        })
        .catch(err => alert(err))

        axios.post(`/api/stores/getStoreInfo`, body)
        .then(response => {
            setStoreInfo(response.data.storeInfo[0])
        })
        .catch(err => alert(err))
    }, [])

    return (
        <div>
            { storeInfo &&
            <Card
                title={storeInfo.storeName}
                hoverable
            >
                <Row gutter={[16, 16]} justify="start">
                    <Col xs={6} sm={5} md={3}>
                        <img src={storeInfo.storeImages} style={{ height: "100px", width: "100px" }} />
                    </Col>
                    <Col xs={18} sm={17} md={12}>
                        <Row>
                            <Text strong>별점 </Text>{parseFloat(storeInfo.ratings)}
                        </Row>
                        <Row style={{ marginTop: "0.25rem" }}>
                            <Text strong>거리 </Text><Text>주소로부터 {parseInt(storeInfo.distance)} m</Text>
                        </Row>
                        <Row style={{ marginTop: "0.25rem" }}>
                            <Text strong>설명 </Text><Text>{storeInfo.storeDescription}</Text>
                        </Row>
                        <Row style={{ marginTop: "0.25rem" }}>
                            {storeInfo.sanitary ? 
                                <Text mark>위생인증가게</Text>
                                :
                                <Text disabled>위생인증</Text>
                            }
                        </Row>
                    </Col>
                </Row>
            </Card>
            }
            {
                products && products.length > 0 ? 
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="메뉴" key="1">
                        <MenuTab productInfo={products} />
                    </TabPane>
                    <TabPane tab="클린리뷰" key="2">
                        <ReviewTab />
                    </TabPane>
                    <TabPane tab="정보" key="3">
                        <InfoTab />
                    </TabPane>
                </Tabs>  
                : null          
            }   
        </div>
    )
}

export default ProductPage
