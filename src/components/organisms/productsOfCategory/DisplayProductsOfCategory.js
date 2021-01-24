import React, { Component } from 'react'
import {
    Container,
    
    CardGroup,
  
} from 'reactstrap'
import './custom.css'
import { ProductDisplayCard } from '../../molecules/Product/ProductDisplayCard'

export default class DisplayProductsOfCategory extends Component {

    render() {
        return (
            <div>
                {
                    this.props.data
                        ?
                        <Container>
                            <CardGroup style={{ justifyContent: 'space-evenly' }}>
                                {this.props.data.map(i => <ProductDisplayCard item={i} />)}
                            </CardGroup>
                        </Container>
                        : null
                }
            </div>

        )
    }
}
