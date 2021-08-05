import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeFavorite } from '../../../_actions/user_actions';
import { Col, Card, Row, Typography, Empty, Button, Icon } from 'antd';
import { Container, EllipsisText } from '../../style/styledDiv';
import { TextButton } from '../../style/styledButton';

const { Title, Text } = Typography


function FavoritePage(props) {
    const dispatch = useDispatch();
    
    const [stores, setStores] = useState([])
    const [isEmpty, setEmpty] = useState(false)

    useEffect(() => {
        getFavoriteStores()
    }, [props.user.userData])

    const getFavoriteStores = () => {
        if (props.user.userData && props.user.userData.favorites) {
            if (props.user.userData.favorites.length > 0) {
                let body = {
                    favoriteIdArr: props.user.userData.favorites
                }

                axios.post(`/api/stores/getFavorites`, body)
                .then(response => {
                    console.log('response'+response)
                    setStores(response.data.stores)
                    setEmpty(false)
                })
            }
            else {
                setEmpty(true)
            }
        }
        else {
            setEmpty(true)
        }
    }

    const removeFavoriteItem = (favoriteId) => {
        dispatch(removeFavorite(favoriteId))
    }

    const renderCards = stores.map((store, index) => {
        return (
            <Col sm={12} xs={24} key={index}>
                    <Card
                        title={store.storeName}
                        extra={<TextButton onClick={() => removeFavoriteItem(store._id)} key={store._id}><Icon type="close" /></TextButton>}
                        hoverable
                    >
                        
                        <a href={`/store/${store._id}`} style={{ color: "black", textDecoration: "none" }}>
                            <Row gutter={[16, 16]}>
                                <Col lg={10} md={24}>
                                    <img style={{ height: "150px", width: "150px" }} src={store.storeImages} />
                                </Col>
                                <Col lg={14} md={24}>
                                    <Row>
                                        <Text strong>별점 </Text>{parseFloat(store.ratings)}
                                    </Row>
                                    <Row style={{ marginTop: "0.5rem" }}>
                                        <Text strong>거리</Text>
                                        <div>주소로부터 {parseInt(store.distance)} m</div>
                                    </Row>
                                    <Row style={{ marginTop: "0.5rem" }}>
                                        <Text strong>설명</Text>
                                        <EllipsisText>{store.storeDescription}</EllipsisText>
                                    </Row>
                                    <Row style={{ marginTop: "0.5rem" }}>
                                        {store.sanitary ? 
                                            <Text mark>위생인증가게</Text>
                                            :
                                            <Text disabled>위생인증</Text>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </a>

                    </Card>
            
            </Col>
        );
    })

    return (
        <Container>
            {isEmpty ? (
                <div>
                    <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE} 
                        description={
                        <div>
                            찜한 가게가 없습니다.
                        </div>
                        }
                    >
                        <Button type="primary" onClick={() => window.location.href='/store' }>
                            가게 찜하러 가기
                        </Button>
                    </Empty>
                </div>
            ) : (
                <div>
                    <Title level={3}>찜한 가게 목록</Title>
                    <br />
                    {/* Cards */}
                    <Row gutter={[16, 16]}>
                        {renderCards}
                    </Row>
                </div>
            )}
        </Container>
    )
}

export default FavoritePage
