import React, { useState, useEffect} from 'react'
import { Radio } from 'antd';

function ReviewGroup(props) {

    const [Value, setValue] = useState({
        first: 'green', 
        second: 'green',
        third: 'green',
        fourth: 'green',
        fifth: 'green'
    })
    
    useEffect(() => {
            props.answer(Value)
    }, [Value])

    return (
        <div>
            <br />
            아이에게 친절한가요? <br/>
            <Radio.Group defaultValue="green" buttonStyle="solid" 
                        onChange={ (e)=> { setValue({ ...Value, first: e.target.value}) } }>
                <Radio.Button value="green">최고에요</Radio.Button>
                <Radio.Button value="yellow">좋아요</Radio.Button>
                <Radio.Button value="orange">아쉬워요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            맛이 어떤가요? <br/>
            <Radio.Group defaultValue="green" buttonStyle="solid" 
                        onChange={(e)=> { setValue({ ...Value, second: e.target.value}) }}>
                <Radio.Button value="green">순해요</Radio.Button>
                <Radio.Button value="yellow">괜찮아요</Radio.Button>
                <Radio.Button value="orange">자극적이에요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            양이 적절한가요? <br/>
            <Radio.Group defaultValue="green" buttonStyle="solid" 
                        onChange={(e)=> { setValue({ ...Value, third: e.target.value}) }}>
                <Radio.Button value="green">많아요</Radio.Button>
                <Radio.Button value="yellow">괜찮아요</Radio.Button>
                <Radio.Button value="orange">적어요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            식당이 쾌적한가요? <br/>
            <Radio.Group defaultValue="green" buttonStyle="solid" 
                        onChange={(e)=> { setValue({ ...Value, fourth: e.target.value}) }}>
                <Radio.Button value="green">최고에요</Radio.Button>
                <Radio.Button value="yellow">좋아요</Radio.Button>
                <Radio.Button value="orange">아쉬워요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            또 가고 싶나요? <br/>
            <Radio.Group defaultValue="green" buttonStyle="solid" 
                        onChange={ (e)=> { setValue({ ...Value, fifth: e.target.value}) } }>
                <Radio.Button value="green">최고에요</Radio.Button>
                <Radio.Button value="yellow">좋아요</Radio.Button>
                <Radio.Button value="orange">아쉬워요</Radio.Button>
            </Radio.Group>
            <br />
        </div>
    )
}

export default ReviewGroup
