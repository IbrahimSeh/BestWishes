import React from 'react';
import { Table} from "react-bootstrap";
import MyEventsComponent from './MyEventsComponent';
import * as api from './api';

export default class ShowUserEvents extends React.Component {
    constructor() {
        super();
        this.state = {
            userEvents: []
        }
        this.rowClick=this.rowClick.bind(this);
        this.buttonClick=this.buttonClick.bind(this);
    }
    
    buttonClick() {
        this.props.history.push("/wishes/1");
    }
    rowClick(idOfEvent) {
        this.props.history.push("/wishes/"+idOfEvent);
    }
   async componentDidMount() {
        const result = await api.getUserEventsByUserID(this.props.match.params.userID);
        const {userEvents}=result;
        this.setState({ userEvents });
    }
    render() {
        return <>
            <center>
                <div className="container" >
                    <div className="row">
                        <div className="col"><h1 style={{ color: "white", textAlign: "center", marginTop: "20px" }} className="font-weight-bold">My Events</h1></div>
                        <Table style={{ textAlign: "center", marginTop: "30px" }} className="table tablebackground tableStyle" id="result">
                            <thead>
                                <tr>
                                    <th scope="col">category</th>
                                    <th scope="col">event Title</th>
                                    <th scope="col">startDate</th>
                                    <th scope="col">endDate</th>
                                    <th scope="col">location</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.userEvents.map(({ id, title, category, startDate,endDate, location }, i) =>
                                <MyEventsComponent key={i} ID={id} title={title} category={category} startDate={startDate} endDate={endDate} location={location} func={this.rowClick} buttonClickFunc={this.buttonClick}/>
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </center>
        </>;
    }
}