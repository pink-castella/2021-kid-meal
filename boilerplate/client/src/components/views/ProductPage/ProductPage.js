import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Col, Card, Row, Typography, Tabs, Icon, Empty } from 'antd';
import styled from 'styled-components';
import MenuTab from './Sections/MenuTab';
import ReviewTab from './Sections/ReviewTab';
import InfoTab from './Sections/InfoTab';
import { saveFavorite, removeFavorite } from '../../../_actions/user_actions';


const { Text } = Typography;
const { TabPane } = Tabs;


function ProductPage(props) {
    const dispatch = useDispatch();
    const storeId = props.match.params.storeId
    const [products, setProducts] = useState([])
    const [storeInfo, setStoreInfo] = useState()
    const [isFavorite, setIsFavorite] = useState(false)

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

        if (props.user.userData && props.user.userData.favorites) {
            if (props.user.userData.favorites.length > 0) {
                if (props.user.userData.favorites.includes(storeId)) {
                    setIsFavorite(true)
                }
                else {
                    alert(props.user.userData.favorites.includes(storeId))
                }
            }
        }

    }, [props.user.userData])

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(storeId))
            .then(response => {
                if (response.payload.success) {
                    setIsFavorite(false)
                }
            })
        }
        else {
            dispatch(saveFavorite(storeId))
            .then(response => {
                if (response.payload.success) {
                    setIsFavorite(true)
                }
            })
        }
    }

    const TextButton = styled.button`
        background: none;
        border: none;
        cursor: pointer;
    `

    const TitleBox = styled.div`
        display: flex;
        justify-content: space-between;  
    `

    return (
        <div>
            {storeInfo && (
                <Card
                    title={
                        <TitleBox>
                            <div>{storeInfo.storeName}</div>
                            { isFavorite 
                            ? <div><TextButton onClick={handleFavorite}><Icon type="heart" theme="filled" /></TextButton></div>
                            : <div><TextButton onClick={handleFavorite}><Icon type="heart" /></TextButton></div>
                            }
                        </TitleBox>
                    }
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
                                    null
                                }
                            </Row>
                        </Col>
                    </Row>
                </Card>        
            )}
            <Tabs defaultActiveKey="1" centered>
                <TabPane tab="메뉴" key="1">
                    { products && products.length > 0 
                    ? <MenuTab productInfo={products} storeId={storeId} />
                    :
                    (
                        <div>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                                description={
                                <div>
                                    메뉴를 준비중입니다. <br />
                                </div>
                                }
                            />
                        </div>                     
                    )}
                </TabPane>
                <TabPane tab="클린리뷰" key="2">
                    <ReviewTab userData={props.user.userData} />
                </TabPane>
                <TabPane tab="정보" key="3">
                    <InfoTab storeId={storeId} />
                </TabPane>
            </Tabs>  
        </div>        
    )
}

export default ProductPage
