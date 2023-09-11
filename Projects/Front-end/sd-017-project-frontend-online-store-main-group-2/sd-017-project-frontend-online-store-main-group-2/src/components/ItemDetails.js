import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      item: {},
    };
    this.fetchItem = this.fetchItem.bind(this);
  }

  componentDidMount() {
    this.fetchItem();
  }

  async fetchItem() {
    const { match: { params: { id } } } = this.props;
    const requisition = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = await requisition.json();
    this.setState({ item: { ...data } });
  }

  render() {
    const { item } = this.state;
    return (
      <div>
        <p data-testid="product-detail-name">{ item.title }</p>
        <img src={ item.thumbnail } alt={ item.title } />
        <p>{`R$ ${item.price}`}</p>
      </div>
    );
  }
}

ItemDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
