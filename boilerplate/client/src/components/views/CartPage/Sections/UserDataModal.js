import { Modal, Button } from 'antd';
import KakaoPay from '../../../utils/KakaoPay';
import React, {useState}  from 'react'
/*
function UserDataModal() {

    const [modal2Visible, setmodal2Visible] = useState(false)
    
    const handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });
        }, 3000);
    };
    
    const handleCancel = () => {
        this.setState({ visible: false });
      };

    return (
        <div>
          <Button type="primary" onClick={() => setModal2Visible(true)}>
            Vertically centered modal dialog
          </Button>
          <Modal
            title="Vertically centered modal dialog"
            centered
            visible={modal2Visible}
            onOk={() => setModal2Visible(false)}
            onCancel={() => setModal2Visible(false)}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Submit
              </Button>,
              <KakaoPay />
            ]}
          >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
          </Modal>
        </div>
      )
}

export default UserDataModal

*/