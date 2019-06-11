import React from 'react';
import {Table} from 'react-bootstrap';


export default class EventDetailsComponent extends React.Component {
    render() {
        return <>
            <Table className="table tablebackground tableStyle" id="info" style={{width:"280px"}}>
                <thead>
                    <tr>
                        <th scope="col" colSpan="2">Event Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>title</td>
                        <td>{this.props.title}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Start Date</td>
                        <td>{this.props.startDate}</td>
                    </tr>
                    <tr>
                        <td>End Date</td>
                        <td>{this.props.endDate}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>{this.props.location}</td>
                    </tr>
                </tbody>
            </Table>
        </>;
    }
}
