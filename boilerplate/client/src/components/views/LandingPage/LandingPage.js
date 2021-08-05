import React from 'react';
import Postcode from '../../utils/Postcode';
import axios from 'axios';
import styled from 'styled-components';
import mealImage from '../../../assets/images/plate-wallpaper.jpg'
import childrenImage from '../../../assets/images/children.png'
import riceImage from '../../../assets/images/rice-bowl.png'

function LandingPage(props) {
    const handleCoords = (addressInfo) => {
        if (addressInfo && addressInfo.x && addressInfo.y) {
            let body = {
                x: addressInfo.x,
                y: addressInfo.y,
                filters: "전체",
                searchTerm: ""
            }

            axios.post('/api/stores/getStores', body)
            .then(response => {
                if (response.data.success) {
                    localStorage.setItem('localUser', JSON.stringify(body))
                    props.history.push('/store')
                }
                else {
                    alert("주소 검색에 실패했습니다")
                }
            })
        }
    }

    const Background = styled.div`
        background-image: url(${mealImage});
        height: 32rem;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    `;

    const Overlay = styled.div`
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    `;

    const Highlight = styled.span`
        // background: linear-gradient(to top, #FFD30A 50%, transparent 50%)
        color: #FFD30A;
    `;

    const Container = styled.div`
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 3rem calc((100vw - 1193px) / 2 + 1rem);
        @media screen and (max-width: 1193px) {
            padding: 3rem 1rem;
        }
        @media screen and (max-width:767px) {
            padding: 3rem 2rem;
            flex-direction: column;
        }
    `;

    const TitleCenter = styled.div`
        text-align: center;
        color: #FAFAFA;
        font-size: 2.5rem;
        font-weight: 900;
        padding-bottom: 0.5rem;
    `;

    const TitleLeft = styled.div`
        font-size: 2rem;
        font-weight: 900;
        color: black;
        padding-bottom: 1rem;
    `;

    const SubTitle = styled.div`
        font-size: 1.25rem;
        font-weight: 600;
        color: #222222;
    `;

    return (
        <div>
            <Background>
                <Overlay>
                    <div style={{ paddingTop: "10rem" }}>
                        <TitleCenter>
                            하루를 완성하는 든든한 &nbsp;
                            <Highlight>끼니</Highlight>
                        </TitleCenter>
                        <SubTitle style={{ textAlign: "center", color: "#FAFAFA", fontStyle: "oblique" }}>
                            어디에서 시작할까요?
                        </SubTitle>
                        <Postcode handleCoords={addressInfo => handleCoords(addressInfo)} />
                    </div>
                </Overlay>
            </Background>
            <Container>
                <div>
                    <TitleLeft>우리 아이 <br /> 밥심(心)</TitleLeft>
                    <SubTitle>
                        나를 대신해 건강한 밥 한끼를 챙겨줄 사람이 없을까?
                    </SubTitle>
                    <br />
                </div>
                <div style={{ display: "flex", alignItems: "start" }}>
                    <img src={childrenImage} width="240px" style={{ position: "relative", zIndex: 9 }} />
                    <img src={riceImage} width="160px" style={{ position: "relative", marginLeft: "-4rem", zIndex: 1 }} />
                </div>
            </Container>
        </div>
    )
}

export default LandingPage
