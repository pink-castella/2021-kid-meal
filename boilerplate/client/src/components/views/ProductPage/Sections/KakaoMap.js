/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';


function KakaoMap(props) {
    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(
                props.storeInfo.storeAddress.location[1], 
                props.storeInfo.storeAddress.location[0]
            ),
            level: 7
        };

        let map = new kakao.maps.Map(container, options);
        let markerPosition = new kakao.maps.LatLng(
            props.storeInfo.storeAddress.location[1], 
            props.storeInfo.storeAddress.location[0]
        )
        let marker = new kakao.maps.Marker({
            position: markerPosition
        })
        marker.setMap(map)
    }, [props.storeInfo])

    const MapContainer = styled.div`
        width: 100%; 
        height: 20rem;
        margin: 1rem 0;
    `;
    
    return (
        <MapContainer id="map" />
    )
}

export default KakaoMap
