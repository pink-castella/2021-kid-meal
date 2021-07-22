import React, { useEffect, useState } from 'react';
import { Col, Card, Row, Typography, Collapse, Tabs } from 'antd';

const { Text } = Typography;
const { Panel } = Collapse;


function MenuTab(props) {
    const [topFourItems, setTopFourItems] = useState([])
    const [products, setProducts] = useState([])

    function compare(a, b) {
        const soldA = a.soldA
        const soldB = b.soldB

        let comparison = 0
        if (soldA > soldB) {
            comparison = 1
        }
        else if (soldA < soldB) {
            comparison = -1
        }
        return comparison
    }

    useEffect(() => {
        setProducts(props.productInfo)

        if (products) {
            let top = products.sort(compare)
            let topFour = [top[0], top[1], top[2], top[3]]

            setTopFourItems(topFour)
        }
    }, [products])

    const showDetail = () => {

    }

    const showTopFour = topFourItems && topFourItems.map((product, index) => {
        return (
            product &&
                <Col span={6}>
                    <Card cover={ <img src={product.image} /> } hoverable onClick={showDetail} >                            
                        <Text strong>{product.title}</Text>
                        <div>{product.price}</div>
                    </Card>
                </Col>
        )
    })

    const renderCards = (menu) => products && products.map((product, index) => {
        return (
            product.menu === menu &&
                <Col xs={24} key={index}>
                    <Card hoverable onClick={showDetail}>
                        <Row gutter={[16, 16]} type="flex" justify="space-between">
                            <Col span={8}>
                                <Row>
                                    <Text strong>{product.title}</Text>
                                </Row>
                                <Row>
                                    <Text>{product.price} 원</Text>
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

    return (
        <div>
            <Row gutter={16}>
                {showTopFour}
            </Row>
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
        </div>
    )
}

export default MenuTab
