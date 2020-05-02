import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CheckoutHeader from './CheckoutHeader';
import Email from './Email';
import Shipping from './Shipping';
import CreditCards from './CreditCards';
import CartSmall from '../cart/CartSmall';
import { API_URL } from '../../config';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 12 * 2,
    color: theme.palette.text.secondary,
    marginBottom: "20px"
  },
  inputInfo: {
    fontSize: "16px",
    marginTop: "20px",
    color: "black"
  }
});

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pane: 0,
      items: [],
      email: "",
      address: {},
      personal: {}
    };
  }
  componentDidMount() {
    const slug = 'products';
    const items = JSON.parse(localStorage.getItem(slug));
    this.setState({ items : items ? items : [] })
  }
  changePane = (pane) => {
    this.setState({ pane });
  }
  handleChange = (name, value) => {
    this.setState({ [name] : value });
  }
  saveDetails = (details) => {
    console.log(details)
    this.setState({ personal: details });
  }
  createOrder = () => {
    const { items, email, personal } = this.state;

    const postBody = {
      items: items,
      shipping: personal,
      email: email
    };

    fetch(`${API_URL}/buy_item`, {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(postBody)
    }).then((response) => response.json())
    .then((res) => {
      localStorage.removeItem('products')
      this.props.history.push({
        pathname: '/confirm',
        state: { order: email, id: res.order_id }
      });
    })
  }

  setToken = (token) => {
    if (!this.state.order_id) {
      this.setState({ error: true });
      return;
    }
    fetch("/order/pay", {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        id: this.state.order_id,
        source: token
      })
    }).then((response) => response.json())
    .then((order) => {
      this.props.history.push({
        pathname: '/confirm',
        state: { order }
      });
    }) 
  }

  render() {
    const { classes, config } = this.props;
    const { pane, address } = this.state;

    let displayAddress;
    if (address.postalCode) {
      displayAddress = <div className={classes.inputInfo}>
        <div>{address.givenName} {address.familyName}</div>
        <div>{address.address1}</div>
        <div>{address.address2}</div>
        <div>{address.locality}, {address.region}</div>
        <div>{address.postalCode}</div>
      </div>
    }
    return (
      <PageWrapper>
        <Grid container className={classes.root} spacing={16} direction={'row-reverse'}>
          <Grid item md={4} xs={12}>
            <Paper className={classes.paper}>
              <CartSmall items={this.state.items} config={config} />
            </Paper>
          </Grid>
          <Grid item md={8} xs={12}>
            <Paper className={classes.paper}>
              <CheckoutHeader text={"Your Email"} classes={classes.heading}
                pane={0} currentPane={pane}
                changePane={() => this.changePane(0)}
              />
              { pane === 0
                ? <Email
                    email={this.state.email} 
                    handleChange={this.handleChange}
                    changePane={() => this.changePane(1)}
                  />
                : <div className={classes.inputInfo}>
                    {this.state.email}
                  </div>
              }
            </Paper>
            <Paper className={classes.paper}>
              <CheckoutHeader text={"Shipping Address"} classes={classes.heading}
                pane={1} currentPane={pane}
                changePane={() => this.changePane(1)}
              />
              { pane === 1
                ? <Shipping
                    address={this.state.address}
                    handleChange={this.handleChange}
                    changePane={() => this.changePane(2)}
                    saveDetails={this.saveDetails}
                  />
                : displayAddress
              }
            </Paper>
            <Paper className={classes.paper}>
              <CheckoutHeader text={"Payment"} classes={classes.heading}
                pane={2} currentPane={pane}
                changePane={() => this.changePane(2)}
              />
              { this.state.error &&
                <p style={{ color: "#f40" }}>Sorry, an error has occurred. Please refresh the page and try again.</p>
              }
              { (!this.state.error && pane === 2)
                && <CreditCards
                    createOrder={this.createOrder}
                  />
              }
            </Paper>
          </Grid>
        </Grid>
      </PageWrapper>
    );
  }
}
export default withRouter(withStyles(styles)(Checkout));