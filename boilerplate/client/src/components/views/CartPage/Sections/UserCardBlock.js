import React, {useEffect, useState} from 'react'
import axios from 'axios'
import"./UserCardBlock.css"

function UserCardBlock(props) {
        
    const [StoreInfo, setStoreInfo] = useState([])

    useEffect(() => {
        
        if (props.products){
            // 상품을 담고 처음 페이지에 진입할 때 useEffect가 두 번 실행됨 
            // 저장 완료 후 두번째 실행 시 초기화를 막기위한 조건문
            if(StoreInfo.length == props.products.length){ 
                // 이미 불러오고 저장완료된 상태이므로 
                // pass
            } else{
                let storeList = []
                setStoreInfo(storeList) // 초기화시켜줘서 삭제해야 remove 뒤에도 새롭게 바뀐(남은 상품 목록) 정보를 잘 받아옴
        
                props.products.forEach(item=> {
                    let body = {
                        store: item.store
                    }
        
                    axios.post(`/api/stores/getStoreInfo`, body)
                        .then(response => {
                            let name = { store: response.data.storeInfo[0].storeName }
                            check(item._id, name, storeList, item)
                        })
                        .catch(err => alert(err))
                })
            }
            
        }
    
    }, [props.products])


    // 페이지 랜더링 시, 여러번의 useEffect 실행으로 인한 불러오기 및 저장 중복 방지 함수 
    const check = ( checkId, inputData, list, objItem) => {    

        let isHave = false
        
        StoreInfo && StoreInfo.map(item =>{
            if( checkId == item._id){ 
                isHave = true
            }
        })

        if( ! isHave ){
            let obj = Object.assign({}, objItem, inputData)
            list.push(obj)
            setStoreInfo(StoreInfo.concat(list))
        }
    }
/*
    const spanName = (storeName) => {
        StoreInfo.map(item=>{

        })
        if(){
            return  <td> {storeName} </td>
        }
        if else() {
            return  <></>
        }
        else{
            return <td> {storeName} </td>
        }
    }
*/
    const renderItems = () => (
        StoreInfo && StoreInfo.map((product, index) => (
            <tr key={index}>
                <td>
                    {product.store}
                </td>
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
            </tr>
        ))
    )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>가게 이름</th>
                        <th>제품 사진</th>
                        <th>메뉴 이름</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    { StoreInfo && 
                        <>
                            {renderItems()} 
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
