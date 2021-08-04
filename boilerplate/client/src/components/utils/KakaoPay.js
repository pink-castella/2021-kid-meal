import jQuery from "jquery";
import React from 'react'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { buyCartItem } from "../../_actions/user_actions";

function KakaoPay(props) {
    // window.$ = window.jQuery = jQuery;

    const saveCheck = () => {
        return alert(' 먼저 주문자 정보를 저장해주세요.')
    } 

    const dispatch = useDispatch()

    const requestPay = () => {
        // const { IMP } = window.IMP;
        let IMP = window.IMP;
        IMP.init("imp57663893");

        const data = { // param
            pg: "kakaopay",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`,  // 필수
            amount: props.total,
            buyer_email: props.user.userData.email,
            buyer_name: props.name,
            buyer_tel: props.phone,
            name: ` ${props.user.cartDetail[0].title} 포함 ${props.user.cartDetail.length}건`,
            cartDetail: props.user.cartDetail
        }

        const callback = (response) => {
            console.log('>>>response: ', response)
            if (response.success) {
                dispatch(buyCartItem(response.imp_uid, response.merchant_uid))       
                console.log('결제 성공');
                var msg = '결제가 완료되었습니다.';
                msg += '고유ID : ' + response.imp_uid;
                msg += '상점 거래ID : ' + response.merchant_uid;
                msg += '결제 금액 : ' + response.paid_amount;
                msg += '카드 승인번호 : ' + response.apply_num;
                console.log(msg)
            } else {
              alert(`!! 결제 실패: ${response.error_msg}`);
            }
        }

        IMP.request_pay(data, callback);
      }

    return (
       
        props.isSave ?
        <button loading={props.loading} type="primary" onClick={requestPay}>결제하기</button>
        :
        <button loading={props.loading} type="primary" onClick={saveCheck}>결제하기</button>
    )

}

export default withRouter(KakaoPay)
