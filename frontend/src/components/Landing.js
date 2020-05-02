import React, { Component } from 'react';
import styled from 'styled-components';

import PageWrapper from './ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ProductList from './product/ProductList';
import Button from '@material-ui/core/Button';

const Hero = styled.div`
  height: 300px;
  background: #aaa;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -40px -40px 60px;
`;

class Landing extends Component {
  
  render() {
    const { config } = this.props;
    return (
      <PageWrapper>
        <Paper style={{ padding: "40px" }}>
          <Hero style={{ backgroundImage: "url(https://images-na.ssl-images-amazon.com/images/G/01/kindle/merch/2019/VX-3273/VX-3273_SMP_FC_GW_Quote_GW-Hero-Desktop-1500x600-1X._CB454647688_.jpg)", backgroundSize: "cover" }}>
            <a href="https://epsagon.com/workshop" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", marginTop: 159 }}>
              <Button variant="raised" color="primary">Win a cool shirt!</Button>
            </a>
            <div style={{ display: "inline-block", maxWidth: "80%" }}>
              <p></p>
            </div>
          </Hero>
          <Divider style={{ margin: "40px 0" }}/>
          <ProductList config={config} />
        </Paper>
      </PageWrapper>
    );
  }
};
export default Landing;