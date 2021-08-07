import React, {useEffect, useState} from 'react'
import axios from 'axios'
import"./UserCardBlock.css"

function UserCardBlock(props) {
        
    const [StoreInfo, setStoreInfo] = useState([])

    useEffect(() => {
        
        let storeList = []

        props.products && props.products.forEach(item=> {

            let body = {
                store: item.store
            }

            axios.post(`/api/stores/getStoreInfo`, body)
                .then(response => {
                    storeList.push(response.data.storeInfo[0].storeName)
                    setStoreInfo(StoreInfo.concat(storeList))
                })
                .catch(err => alert(err))
        })
    
    }, [props.products])


    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    {StoreInfo[index]}
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
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
