/* global kakao */
import React, { useState, useEffect, useRef } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { Input } from 'antd';
import styled from 'styled-components';

function Postcode(props) {
    const backdropEl = useRef()
    const [isOpen, setOpen] = useState(false)

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
                    setOpen(false)
                }
            })
        }
    }

    const handleSearch = () => {
        setOpen(true)
    }

    const handleClickOutside = ({ target }) => {
        if (backdropEl.current && backdropEl.current.contains(target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener("click", handleClickOutside)
        return () => {
            window.removeEventListener("click", handleClickOutside)
        }
    }, [])

    
    const SearchWrapper = styled.div`
        display: flex;
        justify-content: center;
        padding: 3rem;
    `;

    const PopupWrapper = styled.div`
        position: absolute;
        width: 90%;
        max-width: 60rem;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
    `;

    const Backdrop = styled.div`
        z-index: 9;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-tap-highlight-color: transparent;
    `;

    const SearchButton = styled.button`
        background-color: #FFD30A;
        padding-left: 1rem;
        padding-right: 1rem;
        border-radius: 0px 4px 4px 0px;
        border: none;
        cursor: pointer;
        font-weight: 700;
        &:hover {
            color: white;
        }
    `;

    return (
        <React.Fragment>
            <SearchWrapper>
                <Input style={{ width: '60%', borderRadius: "4px 0 0 4px" }} value="아이가 식사를 할 위치를 입력해주세요!" onClick={handleSearch} />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
            </SearchWrapper>
            {isOpen && 
                <div>
                <Backdrop ref={backdropEl} />
                <PopupWrapper>
                    <DaumPostcode
                        onComplete={handleComplete}
                        autoClose
                        style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 8px 24px 0px" }}
                    />
                </PopupWrapper>
                </div>
            }
        </React.Fragment>
    )
}

export default Postcode
