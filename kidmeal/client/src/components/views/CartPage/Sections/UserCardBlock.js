import React, {useEffect, useState} from 'react'
import { Collapse } from 'antd';
import axios from 'axios'
import"./UserCardBlock.css"

function UserCardBlock(props) {

    const { Panel } = Collapse;
    const [ProductInfo, setProductInfo] = useState([])  // 상품 정보와 가게 이름을 하나의 객체로 저장할 변수
    const [StoreName, setStoreName] = useState([])      // 묶어주기 위해 장바구니에 담긴 상품의 가게 이름을 중복 없이 저장하는 변수.
    const [AllNames, setAllNames] = useState([])        // 상품 갯수를 측정하는 변수. 새로운 아이템 추가 시 중복 불러오기 방지를 위함

    useEffect(() => {
        
        if (props.products){
            // 상품을 담고 처음 페이지에 진입할 때 useEffect가 두 번 실행됨 
            // 저장 완료 후 두번째 실행 시 초기화를 막기위한 조건문
            if(ProductInfo.length != props.products.length){
                // 삭제 시에는 여기만 통과
                let storeList = []
                setProductInfo(storeList)   // 초기화시켜줘서 삭제해야 remove 뒤에도 새롭게 바뀐(남은 상품 목록) 정보를 잘 받아옴
        
                props.products.forEach(item=> {
                    let body = {
                        store: item.store
                    }
        
                    axios.post(`/api/stores/getStoreInfo`, body)
                        .then(response => {
                            let name = { store: response.data.storeInfo[0].storeName }
                            checkId(item._id, name, storeList, item)
                        })
                        .catch(err => alert(err))
                })
            }

            if(AllNames.length != props.products.length){
                // 삭제 시에는 통과하지 않음
                let nameList = []
                setStoreName(nameList)
                setAllNames(nameList)
        
                props.products.forEach(item=> {
                    let body = {
                        store: item.store
                    }
        
                    axios.post(`/api/stores/getStoreInfo`, body)
                        .then(response => {
                            checkName(response.data.storeInfo[0].storeName, nameList)
                        })
                        .catch(err => alert(err))
                })
            }
        }
    }, [props.products])

    // 페이지 랜더링 시, 여러번의 useEffect 실행으로 인한 불러오기 및 저장 중복 방지 함수 
    const checkId = ( checkId, inputData, list, objItem) => {    

        let isHave = false
        
        ProductInfo && ProductInfo.map(item => {
            if( checkId == item._id){ 
                isHave = true
            }
        })

        if( !isHave ){
            let obj = Object.assign({}, objItem, inputData)
            list.push(obj)
            setProductInfo(ProductInfo.concat(list))
        }
    }

    // 랜더링 및 저장 시, 중복 체크
        const checkName = ( inputData, list ) => {  
        let isHave = false
        
        StoreName && StoreName.map(item =>{     // 페이지 진입 후 두 번째 랜더링 시, 중복 추가하지 않기 위한 검사
            if(inputData == item){
                isHave = true
            }
        })

        if( !isHave ){
            list.push(inputData)            // state변수에 배열인 nameList를 넣어야함. 바로 값을 넣는건 불가.
                                            // 같은 가게의 상품이 여러개면 list에도 중복 발생. 

            setAllNames([])                     // 초기화
            setAllNames(AllNames.concat(list))  // 상품 갯수만큼 가게 이름이 들어있어야 함 (중복 허용)
            
            const set = new Set(list);
            const uniqueArr = [...set];
            setStoreName(StoreName.concat(uniqueArr))     // 상품에 대한 가게의 종류가 들어있어야 함 (중복 불가)       
        }
    }

    const renderItems = (store) => (
        ProductInfo && ProductInfo.map((product, index) => {
            if(product.store == store){
                return (
                <tr key={index}>
                    <td>
                        <img style={{ width: '70px' }} alt="product"
                            src={product.image} /> 
                    </td>
                    <td>
                        {product.title}
                    </td>
                    <td>
                        {product.quantity} EA
                    </td>
                    <td>
                        $ {product.price}
                    </td>
                    <td>
                        <button onClick={() => props.removeItem(product._id)}>
                            Remove 
                        </button>
                    </td>
                </tr>)
            }
        })
    )
    
    const renderPanel = () => (
        StoreName && StoreName.map(item => (
            <Panel header={item} key={item}>
                {renderItems(item)}
            </Panel>
        ))
    )

    return (
        <>
        {StoreName && 
            <Collapse defaultActiveKey={['1']}>
                {renderPanel()}
            </Collapse>
        }
        </>
    )
}

export default UserCardBlock