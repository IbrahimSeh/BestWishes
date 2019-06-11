import React from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import EventDetailsComponent from './EventDetailsComponent';
import CardComponent from './CardComponent';
import { NavLink } from 'react-router-dom';
import * as api from './api';



export default class WishesComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      event: {},
      wishes: []
    }
  }
  async componentDidMount() {
    const result = await api.getEvent(this.props.match.params.eventID)
    const { event } = result;
    console.log(event)
    const { wishes } = event;
    console.log(wishes);
    this.setState({ event: event, wishes: wishes });
  }

  render() {
    return <>
      <Container>
        <Row>
          <Col md="5">
            <EventDetailsComponent title={this.state.event.title} startDate={this.state.event.startDate} endDate={this.state.event.endDate} location={this.state.event.location} />
          </Col>
          <Col >
            <NavLink className="navbarClass" to={"/AddABestWishComponent/" + this.props.match.params.eventID} activeClassName="text-warning">
              <Button style={{ backgroundColor: "red" }} className="btn btn-primary">Add a Best Wish</Button>
            </NavLink>
          </Col>
        </Row>
        <Row>
          {this.state.wishes.map(({ from, body, image }, i) => { return <CardComponent key={i} from={from} body={body} image={image} /> })}
        </Row>
      </Container>
    </>;
  }

}


