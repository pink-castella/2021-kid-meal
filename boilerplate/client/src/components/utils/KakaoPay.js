import jQuery from "jquery";
window.$ = window.jQuery = jQuery;


import React from 'react'

function KakaoPay(props) {
    const requestPay = () => {
        const IMP = window.IMP; // 생략해도 괜찮습니다.
        IMP.init("TC0ONETIME");

        // IMP.request_pay(param, callback) 호출
        IMP.request_pay({ // param
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: "ORD20180131-0000011",
          name: "노르웨이 회전 의자",
          amount: props.total,
          buyer_email: "gildong@gmail.com",
          buyer_name: "홍길동",
          buyer_tel: "010-4242-4242",
          // buyer_addr: "서울특별시 강남구 신사동",
          // buyer_postcode: "01181"
        }, rsp => { // callback
          if (rsp.success) {
            // 결제 성공 시 로직
          } else {
            // 결제 실패 시 로직
          }
        });
      }

    return (
      <button onClick={requestPay}>결제하기</button>
    )

}

export default KakaoPay
