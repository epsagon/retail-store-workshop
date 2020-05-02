import React, { Component } from 'react';
import styled from 'styled-components';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { withRouter } from "react-router-dom";

import PageWrapper from '../ui/PageWrapper';
import ProductDetails from './ProductDetails';
import Carousel from '../ui/Carousel';
import MobileCarousel from '../ui/MobileCarousel';
import Breadcrumb from '../ui/Breadcrumb';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { API_URL } from '../../config';

const Wrapper = styled.div`
  padding: 40px;
  @media (max-width: 650px) {
    padding: 20px;
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 40px;
  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 40px 0;
  }
`;

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {},
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(product => {
        console.log(this.props.product.item_id)
        product = product.filter(i => i.item_id === this.props.product.item_id)[0]
        this.setState({
          product,
          sku_id: product.item_id,
          price: product.price,
          isLoading: false
        });
      }).catch(error => console.error('Error:', error));
  }

  addToCart = (state) => {
    const { product } = this.state;
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    products.push(product)
    localStorage.setItem('products', JSON.stringify(products));
    this.props.updateNumber(products.length)
    this.props.history.push("/cart");
  }

  render() {
    const { product, isLoading } = this.state;
    let photos;
    if (isWidthUp('sm', this.props.width)) {
      photos = <Carousel photos={[product.link]} url={product.item_id} />;
    } else {
      photos = <MobileCarousel photos={[product.link]} url={product.item_id} />;
    }

    return (
      <PageWrapper>
        <Paper>
          <Wrapper>
            <Breadcrumb product={product} />
            <Grid>
              {photos}
              {isLoading && <CircularProgress style={{margin:'auto'}} size={50} thickness={5} />}
              <div style={{ gridColumn: "span 2" }}>
                <ProductDetails
                  product={product}
                  addToCart={this.addToCart}
                />
              </div>
            </Grid>
          </Wrapper>
        </Paper>
      </PageWrapper>
    );
  }
};
export default withWidth()(withRouter(Product));