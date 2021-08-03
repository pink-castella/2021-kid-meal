import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
import React from 'react'
import axios from 'axios'

function KakaoPay(props) {
    const requestPay = () => {
        const { IMP } = window;
        IMP.init("TC0ONETIME");

        // IMP.request_pay(param, callback) 호출
        IMP.request_pay({ // param
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: `mid_${new Date().getTime()}`,
          name: "노르웨이 회전 의자",
          amount: props.total,
          buyer_email: props.user.userData.email,
          cartDetail: { title, storeId, productId, price, quantity }, 
          paymentData: { paymentId }
        }, rsp => { // callback
          if (rsp.success) {
            axios({
                url: "/api/users/successBuy", // 가맹점 서버
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                  imp_uid: rsp.imp_uid,
                  merchant_uid: rsp.merchant_uid
                }
            }).then((data) => {
                // 가맹점 서버 결제 API 성공시 로직
              })
          } else {
            // 결제 실패 시 로직
            alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
          }
        });
      }

    return (
      <button onClick={requestPay}>결제하기</button>
    )

}

export default KakaoPay
