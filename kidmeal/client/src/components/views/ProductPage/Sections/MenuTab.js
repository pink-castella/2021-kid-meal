import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Card, Row, Typography, Collapse, Modal, Button, InputNumber, Tag, Popover, Icon } from 'antd';
import styled from 'styled-components';
import { addToCart } from '../../../../_actions/user_actions';
import { EllipsisText } from '../../../style/styledDiv';

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
                        alert("??????????????? ??????????????? ??????????????????!")
                        setVisible(0)
                    }
                })
            }
            else {
                alert("1??? ????????? ??????????????? ?????? ??? ????????????.")
            }    
        } else {
            alert("????????? ??? ?????????????????????.")
        }
    }

    const handleCancel = () => {
        setVisible(0)
    }

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
            ??? ????????? ?????? ????????????, ???????????? ???????????? ???????????? <Icon type="smile" />
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
                                    <Text>{product.price} ???</Text>
                                </Row>
                                <Row style={{ paddingTop: "0.25rem" }}>
                                    {product.mild &&
                                        <Popover placement="bottomLeft" content={content}>
                                            <Tag color="#FFD30A">
                                                ?????????
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

    const renderGiftCards = products && products.map((product, index) => {
        return (
            product.isGiftCard &&
                <Col xs={24} key={index}>
                    <Card hoverable onClick={() => showDetail((product._id).toString())} key={product._id}>
                        <Row gutter={[16, 16]} type="flex" justify="space-between">
                            <Col span={8}>
                                <Row>
                                    <Text strong>{product.title}</Text>
                                </Row>
                                <Row>
                                    <Text>{product.price} ???</Text>
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
                <Panel header="?????? ??????" key="1">
                    {renderCards("main")}
                </Panel>
            </Collapse>            
            <Collapse defaultActiveKey={['0']}>
                <Panel header="????????? ??????" key="1">
                    {renderCards("side")}
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="??????" key="1">
                    {renderCards("beverage")}
                </Panel>
            </Collapse>
            <Collapse defaultActiveKey={['1']}>
                <Panel header="?????????" key="1">
                    {renderGiftCards}
                </Panel>
            </Collapse>

            { detail &&
                <Modal
                    visible={Boolean(visible)}
                    title="????????????"
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={400}
                    footer={
                        <Button key="submit" type="primary" onClick={handleOk} style={{ width: "100%" }} >
                            ????????????
                        </Button>
                    }
                    style={{ textAlign: "center" }}
                    bodyStyle={{ padding: 0 }}
                >
                    <img src={detail.image} style={{ width: "100%" }} />
                    <br /><br />
                    <Title level={4}>{detail.title}</Title>
                    <Content>
                        <Text strong>??????</Text>
                        <Text>{detail.price}</Text>
                    </Content>
                    <Content>
                        <Text strong>??????</Text>
                        <InputNumber min={0} max={100} defaultValue={0} value={count} onChange={calculatePrice} />
                    </Content>
                    <Content>
                        <Text strong>??? ??????</Text>
                        <Text>{price}</Text>
                    </Content>
                </Modal>
            }
        </div>
    )
}

export default MenuTab
