/*
import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { Form, Input, Select, Button, Radio, Icon } from 'antd';
function UserDataInput() {

    const { Option } = Select;

    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
    
      const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Form.Item>
      );

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

      const checkHandler = () => {
          console.log('성공')
      }
    
      return (
        <Form
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
    
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onclick={checkHandler}>
              Register
            </Button>
          </Form.Item>
        </Form>
      );
    
}

export default UserDataInput

*/
import React, { useState } from 'react'
import { Button, Form, Input} from 'antd'
const{ TextArea } = Input;

function UserDataInput() {
    const [Title, setTitle] = useState("")
    const [Phone, setPhone] = useState('')
    const [CheckPhone, setCheckPhone] = useState(false)

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const numberChangeHandler = (event) => {
        setPhone(event.currentTarget.value)
    }

    const checkPhonenumber = (e) => {
        var regExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
        
        if(regExp.test(e.target.value)){
            setCheckPhone(true)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();        // 확인 버튼 누를 때 페이지 refresh 되는 것 방지

        if(!Title || !Phone){
            return alert(" 모든 값을 넣어주셔야 합니다.")
        }
        else{
            if(!CheckPhone){
                return alert(" 전화번호는 막대 없이 숫자만 입력해주세요")
            }
            else{
                console.log('성공')
                console.log('이름: ', Title)
                console.log('번호: ', Phone)
            }
        }
    }

    return (
        <Form onSubmit={submitHandler} >
            <label>이름</label>
            <Input onChange={titleChangeHandler} value={Title}/>
            
            <label>전화번호</label>
            <Input type='text' onChange={numberChangeHandler} onBlur={checkPhonenumber}
                value={Phone} placeholder='01012345678' />
            <br />
            <br />
            <Button  htmlType="submit">
                확인
            </Button>
        </Form>
    )
}

export default UserDataInput


