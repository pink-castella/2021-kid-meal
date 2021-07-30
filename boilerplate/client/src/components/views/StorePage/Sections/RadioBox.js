import React, { useState } from 'react';
import { Radio, Card } from 'antd';

function RadioBox(props) {
    const [value, setValue] = useState("전체")

    const renderRadioBox = () => (
        props.list && props.list.map((value) => (
            <Radio.Button key={value._id} value={value.name}> {value.name} </Radio.Button>
        ))
    )    

    const handleChange = (event) => {
        setValue(event.target.value)
        props.handleFilters(event.target.value)
    }

    return (
        <div>
            <Card title="Category">
                
                <Radio.Group onChange={handleChange} value={value} buttonStyle="solid">
                    {renderRadioBox()}                        
                </Radio.Group>

            </Card>
        </div>
    )
}

export default RadioBox
