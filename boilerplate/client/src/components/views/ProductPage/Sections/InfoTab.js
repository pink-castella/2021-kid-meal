import React, { useEffect, useState } from 'react';
import { Card, Typography, Descriptions, Row, Col, Icon } from 'antd';
import axios from 'axios';
import KakaoMap from './KakaoMap';
import styled from 'styled-components';

const { Text } = Typography


function InfoTab(props) {
    const [storeInfo, setStoreInfo] = useState()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let body = { 
            store: props.storeId
        }

        axios.post(`/api/stores/getStoreInfo`, body)
        .then(response => {
            setStoreInfo(response.data.storeInfo[0])
        })
        .catch(err => alert(err))
    }, [])

    const showMap = () => {
        setVisible(!visible)
    }

    const TextButton = styled.button`
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    `

    return (
        storeInfo ? (
            <div>
                <Row gutter={16}>
                    <Card title="업체정보">
                        <Row>
                            <Col xs={24} sm={12} md={8} style={{ paddingBottom: "0.5rem" }}>
                                <Text strong>영업시간</Text> &nbsp; {storeInfo.hour.open} - {storeInfo.hour.close}
                            </Col>
                            <Col xs={24} sm={12} md={8} style={{ paddingBottom: "0.5rem" }}>
                                <Text strong>휴무일</Text> &nbsp; {storeInfo.dayoff}
                            </Col>
                            <Col xs={24} sm={12} md={8} style={{ paddingBottom: "0.5rem" }}>
                                <Text strong>전화번호</Text> &nbsp; {storeInfo.contact}
                            </Col>
                        </Row>
                        <div>
                            <Text strong>지도 </Text> &nbsp; {storeInfo.storeAddress.address_name} &nbsp;
                            <TextButton onClick={showMap}>
                                <Icon type="environment" style={{ fontSize: "1.5rem", color: "#FFD30A" }} theme="filled" />
                            </TextButton>
                            { visible ? (
                                <KakaoMap storeInfo={storeInfo} />
                            ): null }
                        </div>
                    </Card>
                </Row>
                <Row gutter={16}>
                    <Card title="위생정보">
                        <Row>
                            {storeInfo.sanitary ? 
                                <Text mark>위생인증가게</Text>
                                :
                                <Text disabled>X</Text>
                            }
                        </Row>
                    </Card>
                </Row>
                <Row gutter={16}>
                    <Card title="사업자정보">
                        <Row>
                            <Col xs={24} sm={12} md={8} style={{ paddingBottom: "0.5rem" }}>
                                <Text strong>사업자명</Text> &nbsp; {storeInfo.storeOwner.ownerName}
                            </Col>
                            <Col xs={24} sm={12} md={8} style={{ paddingBottom: "0.5rem" }}>
                                <Text strong>상호명</Text> &nbsp; {storeInfo.storeOwner.tradeName}
                            </Col>
                            <Col xs={24} sm={12} md={8} style={{ paddingBottom: "0.5rem" }}>
                                <Text strong>사업자등록번호</Text> &nbsp; {storeInfo.storeOwner.businessRegistrationNumber}
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Row gutter={16}>
                    <Card title="원산지정보">
                        <Row>
                            <Col>
                                원산지정보
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </div>
        )
        :
        (
            <div>
                업체정보
            </div>
        )
    )
}

export default InfoTab
