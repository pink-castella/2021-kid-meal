import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Card, Row, Typography, Tabs, Icon, Empty } from 'antd';
import styled from 'styled-components';
import MenuTab from './Sections/MenuTab';
import ReviewTab from './Sections/ReviewTab';
import InfoTab from './Sections/InfoTab';
import { saveFavorite, removeFavorite } from '../../../_actions/user_actions';
import { Container } from '../../style/styledDiv';
import { TextButton } from '../../style/styledButton';

const { Text } = Typography;
const { TabPane } = Tabs;


function ProductPage(props) {
    const dispatch = useDispatch();
    const storeId = props.match.params.storeId
    const [products, setProducts] = useState([])
    const [storeInfo, setStoreInfo] = useState()
    const [isFavorite, setIsFavorite] = useState(false)
    const [distance, setDistance] = useState(0)

    useEffect(() => {   
        let body = { 
            store: storeId
        }

        axios.post(`/api/products/getProducts`, body)
        .then(response => {
            setProducts(response.data.productInfo)
        })
        .catch(err => alert(err))

        axios.post(`/api/stores/getStoreInfo`, body)
        .then(response => {
            setStoreInfo(response.data.storeInfo[0])
            props.location?.state?.distance && setDistance(props.location.state.distance)
        })
        .catch(err => alert(err))

        if (props.user.userData && props.user.userData.favorites) {
            if (props.user.userData.favorites.length > 0) {
                if (props.user.userData.favorites.includes(storeId)) {
                    setIsFavorite(true)
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

    const TitleBox = styled.div`
        display: flex;
        justify-content: space-between;  
    `

    const Content = styled.div`
        padding: 0 0 0 1rem;
        @media screen and (max-width: 432px) {
            padding: 0.5rem 0 0 0;
        }
    `;

    return (
        <Container>
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
                    <Row gutter={[16, 16]} type="flex" justifyContent="start">
                        <div>
                            <img src={storeInfo.storeImages} style={{ height: "100px", width: "100px" }} />
                        </div>
                        <Content>
                            <div>
                                <Text strong>별점&nbsp;&nbsp;</Text>
                                { storeInfo.reviews ? (
                                    parseFloat(storeInfo.reviews.ratings) / storeInfo.reviews.count
                                ) : ( "-" ) 
                                }
                            </div>
                            <div style={{ marginTop: "0.25rem" }}>
                                <Text strong>거리&nbsp;&nbsp;</Text><Text>주소로부터 {parseInt(distance)} m</Text>
                            </div>
                            <div style={{ marginTop: "0.25rem" }}>
                                <Text strong>설명&nbsp;&nbsp;</Text><Text>{storeInfo.storeDescription}</Text>
                            </div>
                            <div style={{ marginTop: "0.25rem" }}>
                                {storeInfo.sanitary ? 
                                    <Text mark>위생인증가게</Text>
                                    :
                                    null
                                }
                            </div>
                        </Content>
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
                                description="메뉴를 준비중입니다."
                            />
                        </div>                     
                    )}
                </TabPane>
                <TabPane tab="클린리뷰" key="2">
                    <ReviewTab storeId={storeId} />
                </TabPane>
                <TabPane tab="정보" key="3">
                    <InfoTab storeId={storeId} />
                </TabPane>
            </Tabs>  
        </Container>      
    )
}

export default ProductPage
