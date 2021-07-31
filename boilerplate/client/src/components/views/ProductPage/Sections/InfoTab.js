import React, { useEffect, useState } from 'react';
import { Card, Descriptions, Typography, Row, Icon } from 'antd';
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
                        <Descriptions>
                            <Descriptions.Item label="영업시간">{storeInfo.hour.open} - {storeInfo.hour.close}</Descriptions.Item>
                            <Descriptions.Item label="휴무일">{storeInfo.dayoff}</Descriptions.Item>
                            <Descriptions.Item label="전화번호">{storeInfo.contact}</Descriptions.Item>
                        </Descriptions>
                        <div>
                            <Text strong>지도: </Text>&nbsp; {storeInfo.storeAddress.address_name} &nbsp;
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
                        <Descriptions>
                            <Descriptions.Item>
                                {storeInfo.sanitary ? 
                                    <Text mark>위생인증가게</Text>
                                    :
                                    <Text disabled>X</Text>
                                }
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Row>
                <Row gutter={16}>
                    <Card title="사업자정보">
                        <Descriptions>
                            <Descriptions.Item label="사업자명">
                                {storeInfo.storeOwner.ownerName}
                            </Descriptions.Item>
                            <Descriptions.Item label="상호명">
                                {storeInfo.storeOwner.tradeName}
                            </Descriptions.Item>
                            <Descriptions.Item label="사업자등록번호">
                                {storeInfo.storeOwner.businessRegistrationNumber}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Row>
                <Row gutter={16}>
                    <Card title="원산지정보">
                        <Descriptions>
                            <Descriptions.Item>
                                원산지정보
                            </Descriptions.Item>
                        </Descriptions>
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
