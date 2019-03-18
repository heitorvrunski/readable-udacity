import React, { Component } from 'react'
import { Header, Icon, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='question circle' circular />
                        <Header.Content>Not Found !</Header.Content>
                    </Header>
                    <Header as={Link}
                        to={`/`}
                        icon textAlign='center'> Back to Home</Header>
                </Container>
            </div>
        )
    }
}

export default NotFound