import React, { useEffect, useState } from 'react';
import { Typography, Rate, Empty } from 'antd';
import styled from 'styled-components';
import axios from 'axios';

const { Title, Text } = Typography;


function ReviewTab(props) {
    const [ratings, setRatings] = useState(0.0)
    const [reviews, setReviews] = useState({})

    useEffect(() => {
        let body = { 
            store: props.storeId
        }

        axios.post(`/api/stores/getStoreInfo`, body)
        .then(response => {
            let storeInfo = response.data.storeInfo[0]
            if (storeInfo && storeInfo.reviews) {
                setRatings(storeInfo.reviews.ratings / storeInfo.reviews.count)
                setReviews(storeInfo.reviews)    
            }
        })
        .catch(err => alert(err))
    }, [])
 
    return (
        reviews && reviews.first ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <br />
                <Title level={1}>{ratings}</Title>
                <Rate disabled allowHalf defaultValue={ Math.ceil(ratings*2)/2 } />
                <br />
                <Table>
                    <tbody>
                        <TableRow>
                            <TableHeadLeft><Text strong>아이에게 친절해요</Text></TableHeadLeft>
                            <td style={{ border: "none" }}>
                                <CircleWrapper>
                                    <GreenCircle>최고</GreenCircle> <TableValue><Text strong>{reviews.first.green} 명</Text></TableValue>
                                    <YellowCircle>좋아</YellowCircle> <TableValue><Text strong>{reviews.first.yellow} 명</Text></TableValue>
                                    <OrangeCircle>아쉽</OrangeCircle> <TableValue><Text strong>{reviews.first.orange} 명</Text></TableValue>
                                </CircleWrapper>
                            </td>
                            <TableHeadRight />
                        </TableRow>
                        <TableRow>
                            <TableHeadLeft><Text strong>맛이 순해요</Text></TableHeadLeft>
                            <td>
                                <CircleWrapper>
                                    <GreenCircle>순해</GreenCircle><TableValue> <Text strong>{reviews.second.green} 명</Text></TableValue>
                                    <YellowCircle>적당</YellowCircle><TableValue> <Text strong>{reviews.second.yellow} 명</Text></TableValue>
                                    <OrangeCircle>자극</OrangeCircle><TableValue> <Text strong>{reviews.second.orange} 명</Text></TableValue>
                                </CircleWrapper>
                            </td>
                            <TableHeadRight><Text strong>맛이 자극적이예요</Text></TableHeadRight>
                        </TableRow>
                        <TableRow>
                            <TableHeadLeft><Text strong>양이 많아요</Text></TableHeadLeft>
                            <td style={{ border: "none" }}> 
                                <CircleWrapper>
                                    <GreenCircle>많아</GreenCircle> <TableValue><Text strong>{reviews.third.green} 명</Text></TableValue>
                                    <YellowCircle>적당</YellowCircle> <TableValue><Text strong>{reviews.third.yellow} 명</Text></TableValue>
                                    <OrangeCircle>적어</OrangeCircle> <TableValue><Text strong>{reviews.third.orange} 명</Text></TableValue>
                                </CircleWrapper>
                            </td>
                            <TableHeadRight><Text strong>양이 적어요</Text></TableHeadRight>
                        </TableRow>
                        <TableRow>
                            <TableHeadLeft><Text strong>식당이 쾌적해요</Text></TableHeadLeft>
                            <td>
                                <CircleWrapper>
                                    <GreenCircle>최고</GreenCircle> <TableValue><Text strong>{reviews.fourth.green} 명</Text></TableValue>
                                    <YellowCircle>좋아</YellowCircle> <TableValue><Text strong>{reviews.fourth.yellow} 명</Text></TableValue>
                                    <OrangeCircle>아쉽</OrangeCircle> <TableValue><Text strong>{reviews.fourth.orange} 명</Text></TableValue>
                                </CircleWrapper>
                            </td>
                            <TableHeadRight />
                        </TableRow>                        
                        <TableRow>
                            <TableHeadLeft><Text strong>또 가고 싶어요</Text></TableHeadLeft>
                            <td style={{ border: "none" }}>
                                <CircleWrapper>
                                    <GreenCircle>최고</GreenCircle> <TableValue><Text strong>{reviews.fifth.green} 명</Text></TableValue>
                                    <YellowCircle>좋아</YellowCircle> <TableValue><Text strong>{reviews.fifth.yellow} 명</Text></TableValue>
                                    <OrangeCircle>아쉽</OrangeCircle> <TableValue><Text strong>{reviews.fifth.orange} 명</Text></TableValue>
                                </CircleWrapper>
                            </td>
                            <TableHeadRight />
                        </TableRow>
                    </tbody>
                </Table>
            </div>
        )
        :
        (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                    description="아직 리뷰가 없습니다."
                />
            </div>
        )
    )
}

const Table = styled.table`
    padding: 2rem;
    border-top: 2px solid black;
    border-bottom: 3px solid black;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ececec;
    padding: 1rem;
`;

const TableHeadLeft = styled.div`
    padding-top: 1rem;
    padding-left: 1rem;
    margin-right: 4.5rem;
`;

const TableHeadRight = styled.div`
    padding-top: 1rem;
    padding-right: 1rem;
    margin-left: 4.5rem;
    text-align: right;
`;

const TableValue = styled.span`
    position: relative;
    padding-left: 0.75rem;
    padding-right: 1rem;
`;

const CircleWrapper = styled.div`
    padding: 1rem 1rem 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
`;

const GreenCircle = styled.div`
    width: 2rem;
    height: 2rem;
    background: #51CF66;
    border-radius: 50%;
    text-align: center;
`;

const YellowCircle = styled.div`
    width: 2rem;
    height: 2rem;
    background: #F5DF4D;
    border-radius: 50%;
    text-align: center;
`;

const OrangeCircle = styled.div`
    width: 2rem;
    height: 2rem;
    background: #FFA94D;
    border-radius: 50%;
    text-align: center;
`;


export default ReviewTab
