import React from 'react';
import { withRouter } from "react-router-dom";

import PageWrapper from '../ui/PageWrapper';
import Paper from '@material-ui/core/Paper';

const Confirm = (props) => {
  console.log(props)
  return (
    <PageWrapper>
      <Paper style={{ padding: "40px", minHeight: "500px" }}>
        <h2 style={{ marginTop: 0, fontWeight: 600 }}>Thank you for your purchase!</h2>
        <p>A confirmation email has been sent to <b>{props.location.state.order}</b>.</p>
        <p>Order ID: <b>{props.location.state.id}</b>.</p>
      </Paper>
    </PageWrapper>
  );
}
export default withRouter(Confirm);