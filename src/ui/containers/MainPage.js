import React, { Component } from 'react';
import Nav from '../components/Nav';
import TestDataApi from '../../api/mockTestDataApi';

export default class MainPage extends Component {
  state = {
    data: []
  };

  componentDidMount = () => {
    TestDataApi.getAllData()
      .then(response => {
        this.setState({ data: response });
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="wrapper">
        <Header />
        <Nav data={data} />
      </div>
    );
  }
}

const Header = () => {
  return (
    <div className="header">
      <div className="header__offer">
        <h2 className="title">
          <strong>
            FREE UK DELIVERY ON ALL ORDERS OVER £150 | FREE UK RETURNS
          </strong>
        </h2>
      </div>

      <div className="brandName">
        <strong>END.</strong>
      </div>
    </div>
  );
};
