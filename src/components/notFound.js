import { Message, Icon } from 'semantic-ui-react'

// nothing special just a basic 404 message

export const PageNotFound = () => (
  <Message icon size='huge'>
    <Message.Content>
      <Icon name='dont'   size='huge' style={{'margin-bottom': '20px'}}/>
      <Message.Header>Error 404 </Message.Header>
      Page is not found
    </Message.Content>
  </Message>
)
