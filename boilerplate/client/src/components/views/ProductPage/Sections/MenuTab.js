import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Card, Row, Typography, Collapse, Modal, Button, InputNumber, Tag, Popover, Icon } from 'antd';
import styled from 'styled-components';
import { addToCart } from '../../../../_actions/user_actions';

const { Text, Title } = Typography;
const { Panel } = Collapse;


function MenuTab(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [topFourItems, setTopFourItems] = useState([])
    const [products, setProducts] = useState([])
    const [visible, setVisible] = useState(0)
    const [detail, setDetail] = useState({})
    const [count, setCount] = useState(0)
    const [price, setPrice] = useState(0)

    function compare(a, b) {
        const soldA = a.sold
        const soldB = b.sold

        let comparison = 0
        if (soldA < soldB) {
            comparison = 1
        }
        else if (soldA > soldB) {
            comparison = -1
        }
        return comparison
    }

    useEffect(() => {
        setProducts(props.productInfo)

        if (products) {
            let top = products.sort(compare)

            let topFour = []
            top.forEach(item => {
                if (topFour.length < 4 && item.menu !== "beverage") {
                    topFour.push(item)
                }
            })

            setTopFourItems(topFour)
        }
    }, [products])

    const showDetail = (productId) => {
        setVisible(productId)
        setCount(0)
        setPrice(0)

        products.forEach(item => {
            if (Object.values(item).indexOf(productId) > -1) {
                setDetail(item)
            }
        })
    }

    const handleOk = () => {
        if (user.userData.isAuth) {
            if (count > 0) {
                dispatch(addToCart(props.storeId, visible, count))
                .then(response => {
                    if (response.payload) {
                        alert("장바구니에 성공적으로 추가했습니다!")
                        setVisible(0)
                    }
                })
            }
            else {
                alert("1개 이상만 장바구니에 넣을 수 있습니다.")
            }    
        } else {
            alert("로그인 후 이용가능합니다.")
        }
    }

    const handleCancel = () => {
        setVisible(0)
    }

    const EllipsisText = styled.div`
        overflow: scroll;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    `;

    const showTopFour = topFourItems && topFourItems.map((product, index) => {
        return (
            product &&
                <Col key={index} span={6}>
                    <Card 
                        cover={<img src={product.image} />} 
                        hoverable 
                        onClick={() => showDetail((product._id).toString())} 
                        key={product._id} 
                    >                            
                        <EllipsisText>{product.title}</EllipsisText>
                        <div>{product.price}</div>
                    </Card>
                </Col>
        )
    })

    const content = (
        <div>
            이 메뉴는 순한 음식으로, 아이들이 먹기에도 좋답니다 <Icon type="smile" />
        </div>
    )
    
    const renderCards = (menu) => products && products.map((product, index) => {
        return (
            product.menu === menu &&
                <Col xs={24} key={index}>
                    <Card hoverable onClick={() => showDetail((product._id).toString())} key={product._id}>
                        <Row gutter={[16, 16]} type="flex" justify="space-between">
                            <Col span={8}>
                                <Row>
                                    <Text strong>{product.title}</Text>
                                </Row>
                                <Row>
                                    <Text>{product.price} 원</Text>
                                </Row>
                                <Row style={{ paddingTop: "0.25rem" }}>
                                    {product.mild &&
                                        <Popover placement="bottomLeft" content={content}>
                                            <Tag color="#FFD30A">
                                                순한맛
                                            </Tag>
                                        </Popover>
                                    }
                                </Row>
                            </Col>
                            <Col>
                                <img src={product.image} 
                                style={{ height: "100px", width: "100px" }} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
        );
    })

    const calculatePrice = (value) => {
        setCount(value)
        setPrice(detail.price * value)
    }

    const Content = styled.div`
        display: flex;
        justify-content: space-between;  
        padding: 0.5rem 1rem
    `

    return (
        <div>
            <Row gutter={16}>
                {showTopFour}
            </Row>
            <br />
            <Collapse defaultActiveKey={['1']}>
                <Panel header="메인 메뉴" key="1">
                    {renderCards("main")}
                </Panel>
            </Collapse>            
            <Collapse defaultActiveKey={['0']}>
                <Panel header="사이드 메뉴" key="1">
                    {renderCards("side")}
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="음료" key="1">
                    {renderCards("beverage")}
                </Panel>
            </Collapse>

            { detail &&
                <Modal
                    visible={Boolean(visible)}
                    title="메뉴상세"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={400}
                    footer={
                        <Button key="submit" type="primary" onClick={handleOk} style={{ width: "100%" }} >
                            주문하기
                        </Button>
                    }
                    style={{ textAlign: "center" }}
                    bodyStyle={{ padding: 0 }}
                >
                    <img src={detail.image} style={{ width: "100%" }} />
                    <br /><br />
                    <Title level={4}>{detail.title}</Title>
                    <Content>
                        <Text strong>가격</Text>
                        <Text>{detail.price}</Text>
                    </Content>
                    <Content>
                        <Text strong>수량</Text>
                        <InputNumber min={0} max={100} defaultValue={0} value={count} onChange={calculatePrice} />
                    </Content>
                    <Content>
                        <Text strong>총 금액</Text>
                        <Text>{price}</Text>
                    </Content>
                </Modal>
            }
        </div>
    )
}

export default MenuTab
