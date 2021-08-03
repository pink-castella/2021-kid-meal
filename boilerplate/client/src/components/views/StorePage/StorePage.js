import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, Row, Typography, Empty, Button } from 'antd';
import styled from 'styled-components';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { category } from './Sections/Data';
import SortFeature from './Sections/SortFeature';

const { Text } = Typography;


function StorePage(props) {
    const [stores, setStores] = useState([])
    const [filters, setFilters] = useState("전체")
    const [searchTerm, setSearchTerm] = useState("")
    const [isEmpty, setEmpty] = useState(false)
    const [location, setLocation] = useState({})
    const [success, setSuccess] = useState(false)
    const [sort, setSort] = useState(false)

    useEffect(() => {
        if (props.user.userData && props.user.userData.currentAddress) {
            /*로그인한 유저에 저장된 주소 있는 경우*/         
            if (props.user.userData.currentAddress.location) {
                let body = {
                    x: props.user.userData.currentAddress.location.x,
                    y: props.user.userData.currentAddress.location.y,
                    filters: "전체",
                    searchTerm: ""
                }
                setLocation({ 
                    x: props.user.userData.currentAddress.location.x,
                    y: props.user.userData.currentAddress.location.y 
                })
                getStores(body)
            /*로그인한 유저에 저장된 주소 없는 경우*/
            } else {
                setLocation({})
                setStores()
                setEmpty(true)
            }
        }

        if (localStorage.getItem('localUser')) {
            /*로그인 안하고 랜딩 페이지에서 주소 입력한 경우*/
            let body = JSON.parse(localStorage.getItem('localUser'))
            getStores(body)
            setLocation({
                x: body.x,
                y: body.y
            })
        }
    }, [props.user.userData])

    function calcDistance(lat1, lon1, lat2, lon2) {
        let R = 6371  // Radius of the earth in km
        let dLat = toRad(lat2-lat1)
        let dLon = toRad(lon2-lon1)
        let latOne = toRad(lat1)
        let latTwo = toRad(lat2)

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latOne) * Math.cos(latTwo)
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        let d = R * c * 1000  // km to m
        return d
    }

    function toRad(value) {
        return value * Math.PI / 180
    }

    const getStores = (body) => {
        axios.post('/api/stores/getStores', body)
        .then(response => {
            if (response.data.success) {
                if (response.data.storeInfo) {
                    let storeList = []

                    response.data.storeInfo.forEach(item => {
                        let distance = calcDistance(body.y, body.x, item.storeAddress.location[1], item.storeAddress.location[0])
                        let distanceItem = { distance: distance }
                        let obj = Object.assign({}, item, distanceItem)
                        storeList.push(obj)
                    })

                    setStores(storeList.sort(compareByDistance))
                    setSuccess(true)
                    setEmpty(false)
                    
                    if (!response.data.storeInfo.length) {
                        setEmpty(true)
                    }
                }
            } else {
                alert("가게 정보를 가져오는데 실패했습니다.")
            }
        })
    }

    const showFilteredResults = (selected) => {
        let body = {
            x: location.x,
            y: location.y,
            filters: selected,
            searchTerm: ""
        }

        getStores(body)
    }

    const handleFilters = (selected) => {
        showFilteredResults(selected)
        setFilters(selected)
    }

    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            x: location.x,
            y: location.y,
            filters: filters,
            searchTerm: newSearchTerm
        }

        setSearchTerm(newSearchTerm)
        
        getStores(body)
    }

    const goToEnterAddress = () => {
        if (props.user.userData) {
            window.location.href='/address'
        } else {
            window.location.href='/'
        }
    }

    function compareBySold(a, b) {
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

    function compareByName(a, b) {
        const nameA = a.storeName
        const nameB = b.storeName

        let comparison = 0
        if (nameA > nameB) {
            comparison = 1
        }
        else if (nameA < nameB) {
            comparison = -1
        }
        return comparison
    }

    function compareByDistance(a, b) {
        const distanceA = a.distance
        const distanceB = b.distance

        let comparison = 0
        if (distanceA > distanceB) {
            comparison = 1
        }
        else if (distanceA < distanceB) {
            comparison = -1
        }
        return comparison
    }

    const updateSortTerm = (newSortTerm) => {
        let sorted = stores

        if (newSortTerm === "주문") {
            sorted = stores.sort(compareBySold)
        } else if (newSortTerm === "이름") {
            sorted = stores.sort(compareByName)
        } else {
            sorted = stores.sort(compareByDistance)
        }
        
        setStores(sorted)
        setSort(!sort)
    }

    const EllipsisText = styled.div`
        overflow: scroll;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        -webkit-box-orient: vertical;
    `;

    const renderCards = stores && stores.map((store, index) => {
        return (
            <Col sm={12} xs={24} key={index}>
                <a href={`/store/${store._id}`}>
                    <Card
                        title={store.storeName}
                        hoverable
                    >
                        
                        <Row gutter={[16, 16]}>
                            <Col lg={9} md={24}>
                                <img 
                                    style={{ height: "150px", width: "150px" }} 
                                    src={store.storeImages} 
                                />
                            </Col>
                            <Col lg={15} md={24}>
                                <Row>
                                    <Text strong>별점 {store.ratings}</Text>
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
                                        <Text>&nbsp;</Text>
                                    }
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </a>
            </Col>
        );
    })

    return (
        isEmpty && (props.user.userData && !props.user.userData.isAuth) ? (
            <div>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description={
                    <span>
                        가까운 지역 (500m) 안팎에 가맹점이 없습니다. <br />
                        다른 주소를 입력해주세요.
                    </span>
                    }
                >
                    <Button type="primary" onClick={goToEnterAddress}>
                        주소 입력하러가기
                    </Button>
                </Empty>
            </div>                   
        ) : (
            <div>
                {/* Filter */}
                <Row gutter={[16, 16]}>
                    {/* RadioBox */}
                    <Col>
                        <Radiobox list={category} handleFilters={selected => handleFilters(selected)} />
                    </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem auto' }}>
                    {/* Sort */}
                    <SortFeature
                        refreshFunction={updateSortTerm}
                    />

                    {/* Search */}
                    <SearchFeature 
                        refreshFunction={updateSearchTerm}
                    />
                </div>

                {/* Cards */}
                <Row gutter={[16, 16]}>
                    {renderCards}
                </Row>

                {isEmpty ? (
                    <div>
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            description="가까운 지역 (500m) 안팎에 가맹점이 없습니다."
                        />
                    </div>                
                ) : null}
            </div>
        )
    )
}

export default StorePage
