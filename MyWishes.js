import React from 'react';

import './general.css';
import * as api from "./api";
import CardUserWishesComponent from './CardUserWishesComponent';
import { Row, Container } from 'react-bootstrap';
import WishContext from './WishContext';

export default class MyWishes extends React.Component {
  constructor() {
    super();
    this.state = {
      wishes: []
    }
  }
  async componentDidMount() {
    const result = await api.getWishes(this.props.match.params.userID, this.context.userID);
    const { eventWishes } = result;
    this.setState({ wishes: eventWishes });
  }
  render() {
    return <Container>
      <Row>
        {this.state.wishes.map(({ id,from,body,image}, i) => { return <CardUserWishesComponent key={i} ID={id} from={from} wishContent={body} imageURL={image} /> })}
      </Row>
    </Container>;
  }
}
MyWishes.contextType = WishContext;