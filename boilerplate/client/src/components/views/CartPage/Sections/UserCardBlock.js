import React from 'react'
import"./UserCardBlock.css"

function UserCardBlock(props) {
    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    // 고쳐야 함 !
                    {product.store.StoreName}
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
