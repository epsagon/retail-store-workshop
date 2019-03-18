import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

const Right = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin: 30px 0 60px;
  align-items: baseline;
`;
const Description = styled.div`
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
`;

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    };
  }

  render() {
    const { product } = this.props;
    return (
      <div>
        <h2 style={{ marginTop: "0" }}>{product.name}</h2>
        <Description>{product.description}</Description>
        <div style={{ fontWeight: "600", textAlign: "right" }}>
          ${product.price}
        </div>
        <Right>
          <Button variant="raised" color="primary"
            onClick={() => this.props.addToCart(this.state)}
          >
            Add To Cart
          </Button>
        </Right>
      </div>
    );
  }
};
export default ProductDetails;