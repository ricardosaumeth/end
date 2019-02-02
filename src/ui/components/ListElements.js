import React, { Component } from 'react';
import './ListElements.css';

export default class ListElements extends Component {
  state = {
    brandNames: []
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { data } = this.props;
    let brandNames = [];
    if (data !== prevProps.data) {
      brandNames = data.map(b => {
        return { name: b.name, url: b.url_path, opacity: 1 };
      });
      this.setState({ brandNames });
    }
  };

  setOpacityOnMouseEnter = e => {
    const { setActiveLink, displayInnerPanel } = this.props;
    const activeLink = e.target.textContent;

    this.setBrandsOpacity(0.5, e);
    setActiveLink && setActiveLink(activeLink);
    displayInnerPanel && displayInnerPanel('block');
  };

  setOpacityOnMouseLeave = e => {
    const { displayInnerPanel } = this.props;
    this.setBrandsOpacity(1, e);
    displayInnerPanel && displayInnerPanel('none');
  };

  setBrandsOpacity = (value, e) => {
    /**
     * I should add a class that manipulates the opacity using animations
     * Short of time to do it
     */
    const { brandNames } = this.state;
    if (brandNames && Array.isArray(brandNames)) {
      const brands = brandNames.map(b => {
        if (e && e.target.innerHTML !== b.name) {
          b.opacity = value;
          return b;
        } else {
          return b;
        }
      });
      this.setState({ brandNames: brands });
    }
  };

  render() {
    const { brandNames } = this.state;
    let list = null;
    list = brandNames.map(d => {
      return (
        <div>
          <li
            key={d.name}
            className="listElemt"
            onMouseOver={this.setOpacityOnMouseEnter}
            onMouseOut={this.setOpacityOnMouseLeave}
          >
            <div style={{ textAlign: 'center' }}>
              <a href={d.url_path} key={d.url_path}>
                <span style={{ opacity: d.opacity }}>
                  <strong>{d.name}</strong>
                </span>
              </a>
            </div>
          </li>
        </div>
      );
    });
    return list;
  }
}
