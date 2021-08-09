import React, { useState, useEffect} from 'react'
import { Radio } from 'antd';

function ReviewGroup(props) {

    const [Value, setValue] = useState({
        first: '최고에요', 
        second: '순해요',
        third: '많아요',
        fourth: '최고에요',
        fifth: '최고에요'
    })
    
    useEffect(() => {
            props.answer(Value)
    }, [Value])

    return (
        <div>
            <br />
            아이에게 친절한가요? <br/>
            <Radio.Group defaultValue="최고에요" buttonStyle="solid" 
                        onChange={ (e)=> { setValue({ ...Value, first: e.target.value}) } }>
                <Radio.Button value="최고에요">최고에요</Radio.Button>
                <Radio.Button value="좋아요">좋아요</Radio.Button>
                <Radio.Button value="아쉬워요">아쉬워요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            맛이 어떤가요? <br/>
            <Radio.Group defaultValue="순해요" buttonStyle="solid" 
                        onChange={(e)=> { setValue({ ...Value, second: e.target.value}) }}>
                <Radio.Button value="순해요">순해요</Radio.Button>
                <Radio.Button value="괜찮아요">괜찮아요</Radio.Button>
                <Radio.Button value="자극적이에요">자극적이에요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            양이 적절한가요? <br/>
            <Radio.Group defaultValue="많아요" buttonStyle="solid" 
                        onChange={(e)=> { setValue({ ...Value, third: e.target.value}) }}>
                <Radio.Button value="많아요">많아요</Radio.Button>
                <Radio.Button value="괜찮아요">괜찮아요</Radio.Button>
                <Radio.Button value="적어요">적어요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            식당이 쾌적한가요? <br/>
            <Radio.Group defaultValue="최고에요" buttonStyle="solid" 
                        onChange={(e)=> { setValue({ ...Value, fourth: e.target.value}) }}>
                <Radio.Button value="최고에요">최고에요</Radio.Button>
                <Radio.Button value="좋아요">좋아요</Radio.Button>
                <Radio.Button value="아쉬워요">아쉬워요</Radio.Button>
            </Radio.Group>
            <br />
            <br />
            또 가고 싶나요? <br/>
            <Radio.Group defaultValue="최고에요" buttonStyle="solid" 
                        onChange={ (e)=> { setValue({ ...Value, fifth: e.target.value}) } }>
                <Radio.Button value="최고에요">최고에요</Radio.Button>
                <Radio.Button value="좋아요">좋아요</Radio.Button>
                <Radio.Button value="아쉬워요">아쉬워요</Radio.Button>
            </Radio.Group>
            <br />
        </div>
    )
}

export default ReviewGroup
