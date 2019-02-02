import React, { Component } from 'react';
import ListElements from './ListElements';
import './HeaderAccordion.css';

export default class HeaderAccordion extends Component {
  state = {
    displayInnerPanel: 'none',
    data: [],
    activeLink: ''
  };

  onMouseEntered = e => {
    this.setBrandsOpacity(0.5, e);
    this.setState({
      displayInnerPanel: 'block',
      activeLink: e.target.innerHTML
    });
  };

  onMouseLeaved = e => {
    this.setBrandsOpacity(1, e);
    this.setState({ displayInnerPanel: 'none' });
  };

  render() {
    const { data } = this.props;
    const { activeLink, displayInnerPanel } = this.state;
    return (
      <div className="panel-group">
        {/* <div className='menu'> */}
        <ul className="horizontal-list">
          <ListElements
            data={data}
            key={1}
            setActiveLink={e => this.setState({ activeLink: e })}
            displayInnerPanel={e => {
              this.setState({ displayInnerPanel: e });
            }}
          />
        </ul>
        {/* </div> */}
        <InnerPannel
          display={displayInnerPanel}
          activeLink={activeLink}
          data={data}
        />
      </div>
    );
  }
}

const InnerPannel = ({ display, data, activeLink }) => {
  const childData = [];
  data.forEach(d => {
    if (activeLink === d.name) {
      childData.push(d);
    }
  });

  const isFourColumnsLayout =
    activeLink === 'Sale' ||
    activeLink === 'Brands' ||
    activeLink === 'Accessories'
      ? true
      : false;

  const pannelBody = isFourColumnsLayout ? (
    <PannelBodyFourColumns data={childData} />
  ) : (
    <PannelBodyThreeColumns data={childData} />
  );

  return (
    <div className="innerpanel" style={{ display: display }}>
      <InnerPannelGrid>{pannelBody}</InnerPannelGrid>
    </div>
  );
};

const InnerPannelGrid = ({ children }) => {
  return <div className="innerPannelGrid">{children}</div>;
};

const PannelBodyThreeColumns = ({ data }) => {
  const brandName = data.length === 1 && data[0].name;

  if (brandName) {
    const childData = data[0].children_data;
    const maxNumberOfItems = 13;
    let listColumn1 = [];
    let listColumn2 = [];

    childData.forEach(c => {
      let list = (
        <li key={c.name}>
          <a href="# ">{c.name}</a>
        </li>
      );

      if (listColumn1.length < maxNumberOfItems) {
        listColumn1.push(list);
      } else if (listColumn2.length < maxNumberOfItems) {
        listColumn2.push(list);
      } 
    });
    return (
      <div className="pannelBody">
        <div className="pannelBody__column1">
          <a href="# ">{`view all ${brandName}`}</a>
          <ul className="pannelBody__list">{listColumn1}</ul>
        </div>
        <div className="pannelBody__column2">
          <ul className="pannelBody__list">
            <a href="# ">{`${brandName.toUpperCase()} BRANDS`}</a>
            {listColumn2}
          </ul>
        </div>
        <div className="pannelBody__column3">
          <BrandPics data={data[0]} />
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const PannelBodyFourColumns = ({ data }) => {
  const brandName = data.length === 1 && data[0].name;

  if (brandName) {
    const childData = data[0].children_data;
    const maxNumberOfItems = 13;
    let listColumn1 = [];
    let listColumn2 = [];
    let listColumn3 = [];

    childData.forEach(c => {
      let list = (
        <li key={c.name}>
          <a href="# ">{c.name}</a>
        </li>
      );

      if (listColumn1.length < maxNumberOfItems) {
        listColumn1.push(list);
      } else if (listColumn2.length < maxNumberOfItems) {
        listColumn2.push(list);
      } else if (listColumn3.length < maxNumberOfItems) {
        listColumn3.push(list);
      }
    });

    return (
      <div className="pannelBody">
        <div className="pannelBody__column1">
          <a href="# ">{`view all ${brandName}`}</a>
          <ul className="pannelBody__list">{listColumn1}</ul>
        </div>

        <div className="pannelBody__column2">
          <ul className="pannelBody__list">{listColumn2}</ul>
        </div>

        <div className="pannelBody__column3">
          <ul className="pannelBody__list">{listColumn3}</ul>
        </div>

        <div className="pannelBody__column4">
          <BrandPics data={data[0]} Pics={2}/>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const BrandPics = ({ data, Pics }) => {
  const imgsShown = Pics ? Pics : 4;

  let imgs = [];
  for (let i = 1; i <= imgsShown; i++) {
    imgs[i] = (
      <div key={i}>
        <img src={`${data.dropdown_image_url}${i}`} alt={'img'} />
      </div>
    );
  }
  return <>{imgs}</>;
};
