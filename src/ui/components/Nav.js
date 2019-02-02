import React, { Component } from 'react';
import HeaderAccordion from './HeaderAccordion';

export default class Nav extends Component {
  render() {
    const { data } = this.props;
    return <HeaderAccordion data={data} />;
  }
}
