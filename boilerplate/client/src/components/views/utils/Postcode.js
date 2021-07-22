/* global kakao */
import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Input, Button } from 'antd';
import styled from 'styled-components';

function Postcode(props) {
    const [isModal, setIsModal] = useState(false)

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        // 주소-좌표 변환 객체 생성
        if (fullAddress) {
            let geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색
            geocoder.addressSearch(fullAddress, function(result, status) {
                // 정상적으로 검색이 완료
                if (status === window.kakao.maps.services.Status.OK) {
                    let addressInfo = {
                        x: parseFloat(result[0].x), 
                        y: parseFloat(result[0].y),
                        address_name: fullAddress,
                        nickname: data.bname
                    }

                    props.handleCoords(addressInfo)
                    setIsModal(false)
                }
            })
        }
    }

    const handleSearch = () => {
        setIsModal(true)
    }
    
    const SearchWrapper = styled.div`
        display: flex;
        justify-content: center;
        padding: 3rem;
    `;

    const PopupWrapper = styled.div`
        display: flex;
        justify-content: center;
    `;

    return (
        <React.Fragment>
            <SearchWrapper>
                <Input style={{ width: '60%' }} value="아이가 식사를 할 위치를 입력해주세요!" onClick={handleSearch} />
                <Button type="primary" onClick={handleSearch}>검색</Button>
            </SearchWrapper>
            {isModal && 
                <PopupWrapper>
                    <DaumPostcode
                        onComplete={handleComplete}
                        autoClose
                        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
                    />
                </PopupWrapper>
            }
        </React.Fragment>
    )
}

export default Postcode
