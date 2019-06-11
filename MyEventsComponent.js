import React from 'react';
import { Button, Col, Row } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import './general.css';
export default class MyEventsComponent extends React.Component {
    render() {
        return (
            <>
                <tr>
                    <td>{this.props.category}</td>
                    <td>{this.props.title}</td>
                    <td>{this.props.startDate}</td>
                    <td>{this.props.endDate}</td>
                    <td>{this.props.location}</td>
                    <td>
                        <Button onClick={() => this.props.func(this.props.ID)}>Show</Button>
                        <NavLink className="navbarClass btn text-primary" to={"/UpdateEventComponent/" + this.props.ID} activeClassName="text-warning">
                            Update
                        </NavLink>
                        <Button className="font-weight-bold" variant="primary" style={{ border: "2px solid red" }}>Delete</Button>
                    </td>
                </tr>
            </>
        );
    }
}
