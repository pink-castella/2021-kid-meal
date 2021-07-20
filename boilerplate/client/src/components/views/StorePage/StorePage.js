import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, Row, Typography, Empty, Button } from 'antd';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { category } from './Sections/Data';
import './StorePage.css';

const { Text } = Typography;

function StorePage() {
    const [stores, setStores] = useState([])
    const [filters, setFilters] = useState()
    const [searchTerm, setSearchTerm] = useState("")
    const [isEmpty, setEmpty] = useState(false)

    useEffect(() => {
        let body = JSON.parse(localStorage.getItem('localUser'))
        getStores(body)
    }, [])

    const getStores = (body) => {
        axios.post('/api/stores/getStores', body)
        .then(response => {
            if (response.data.success) {
                if (response.data.storeInfo.length) {
                    setStores(response.data.storeInfo)
                    console.log(JSON.stringify(response.data))    
                }
                else {
                    setEmpty(true)
                }
            } else {
                alert("가게 정보를 가져오는데 실패했습니다.")
            }
        })
    }

    const renderCards = stores.map((store, index) => {
        console.log(store)

        return (
            <Col sm={12} xs={24} key={index}>
                <a href={`/store/${store._id}`}>
                    <Card
                        title={store.storeName}
                        hoverable
                    >
                        
                        <Row gutter={[16, 16]}>
                            <Col lg={10} md={24}>
                                <img class="center-cropped" src={store.storeImages} />
                            </Col>
                            <Col lg={14} md={24}>
                                <Row>
                                    <Text strong>거리</Text>
                                    <div>주소로부터 {parseInt(store.distance)} m</div>
                                </Row>
                                <br />
                                <Row>
                                    <Text strong>설명</Text>
                                    <div class="text">{store.storeDescription}</div>
                                </Row>
                                <br />
                                <Row>
                                    {store.sanitary ? 
                                        <Text mark>위생인증가게</Text>
                                        :
                                        <Text disabled>위생인증</Text>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </a>
            </Col>
        );
    })

    const showFilteredResults = (selected) => {
        let body = {
            filters: selected
        }

        getStores(body)
    }

    const handleFilters = (selected) => {
        showFilteredResults(selected)
        setFilters(selected)
    }

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            filters: filters,
            searchTerm: newSearchTerm
        }

        setSearchTerm(newSearchTerm)
        
        getStores(body)
    }

    return (
        isEmpty ? (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                    <div>
                        가까운 지역 (500m) 내에 가맹점이 없습니다. <br />
                        다른 주소를 입력해주세요.
                    </div>
                    }
                >
                    <Button type="primary" onClick={() => window.location.href='/'}>
                        주소 입력하러가기
                    </Button>
                </Empty>
            </div>
        ) : (
            <div>
                {/* Filter */}
                <Row gutter={[16, 16]}>
                    <Col>
                        {/* RadioBox */}
                        <Radiobox list={category} handleFilters={selected => handleFilters(selected)} />
                    </Col>
                </Row>

                {/* Search */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                    <SearchFeature 
                        refreshFunction={updateSearchTerm}
                    />
                </div>

                {/* Cards */}
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>
            </div>
        )
    )
}

export default StorePage
