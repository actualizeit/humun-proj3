import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const ModalBasicExample = () => (
  <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
    <Header  content='Note:' />
    <Modal.Content>
      <p>
        Your password must contain at least six characters.
      </p>
    </Modal.Content>
    {/* <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions> */}
  </Modal>
)

export default ModalBasicExample