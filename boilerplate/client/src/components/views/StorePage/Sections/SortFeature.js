import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;


function SortFeature(props) {
    const [sortTerm, setSortTerm] = useState("")

    const handleChange = (value) => {
        setSortTerm(value)
        props.refreshFunction(value)
    }

    return (
        <div>
            <Select defaultValue="거리" style={{ width: 120 }} onChange={handleChange}>
                <Option value="거리">거리순</Option>
                <Option value="주문">주문순</Option>
                <Option value="이름">이름순</Option>
            </Select>
        </div>
    )
}

export default SortFeature
