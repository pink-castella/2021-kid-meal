import React, { useEffect } from 'react'

const KakaoShareButton = () => {
    useEffect(() => {
        createKakaoButton()
    }, [])

    const createKakaoButton = () => {
        // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
        if (window.Kakao) {
            const kakao = window.Kakao
        // 중복 initialization 방지
        if (!kakao.isInitialized()) {
            // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
            kakao.init(process.env.REACT_APP_KAKAO_KEY)
        }
        kakao.Link.createDefaultButton({
            // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: '타이틀',
                description: '#리액트 #카카오 #공유버튼',
                imageUrl: 'kakao.png',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                },
            },
            social: {
                likeCount: 77,
                commentCount: 55,
                sharedCount: 333,
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                    },
                },
                {
                    title: '앱으로 보기',
                    link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                    },
                },
            ],
        })
        }
    }

    // 초기화까지 정상 작동하지만 카카오 로그인까지 구현해야 해서 동작하지 않는 듯 함
    // a태그의 href는 테스트 버전에서만 사용

    return (
        <div className="kakao-share-button">
        <a id="kakao-link-btn" href="https://www.kakaocorp.com/page/service/service/KakaoTalk">
            <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" 
                alt="공유하기" width="30" height="30"/>
        </a>
        </div>
    )
}
export default KakaoShareButton