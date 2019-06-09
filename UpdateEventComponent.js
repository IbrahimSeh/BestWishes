import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, InputGroup, Button, Row, Col, Container } from "react-bootstrap";
import { faLocationArrow, faCalendar, faTag, faList, faClock } from "@fortawesome/free-solid-svg-icons";

import validator, { field } from './validator';
import WishContext from './WishContext';
import * as api from './api';

export default class UpdateEventComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            category: field({ value: '', name: 'category' }),
            title: field({ value: '', name: 'title', minLength: 2 }),
            startDate: field({ value: '', name: 'startDate' }),
            endDate: field({ value: '', name: 'endDate' }),
            timeStartDate: field({ value: '', name: 'timeStartDate' }),
            timeEndDate: field({ value: '', name: 'timeEndDate' }),
            location: field({ value: '', name: 'location', minLength: 2 })
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }
    async  componentDidMount() {
        const result = await api.getEvent(this.props.match.params.eventID)
        const { event } = result;
        localStorage.setItem("userEvent", JSON.stringify(event));
        setTimeout(() => {
            const userEvent = JSON.parse(localStorage.getItem('userEvent'));
            let { startDate, endDate } = userEvent;
            const [timeEndDate, EndDate] = endDate.split(' ').reverse();
            const [timeStartDate, StartDate] = startDate.split(' ').reverse();
            startDate = StartDate.split('-').reverse().join('-');
            endDate = EndDate.split('-').reverse().join('-');
            console.log("startDate: " + startDate);
            console.log("endDate: " + endDate);
            let month = startDate.substring(8, 10), day = startDate.substring(5, 7), year = startDate.substring(0, 4);
            const newStartDate = year + '-' + month + '-' + day;
            month = endDate.substring(8, 10), day = endDate.substring(5, 7), year = endDate.substring(0, 4);
            const newEndDate = year + '-' + month + '-' + day;
            const event = Object.assign({}, this.state);
            for (let key in event) {
                event[key].value = userEvent[key];
            }
            event.startDate.value = newStartDate;
            event.endDate.value = newEndDate;
            event.timeStartDate.value = timeStartDate;
            event.timeEndDate.value = timeEndDate;
            this.setState({ ...event });
        }, 500);
    }
    onInputChange({ target: { name, value } }) {
        console.log(name, value);
        this.setState({
            [name]: {
                ...this.state[name],
                value,
                ...validator(value, name, this.state[name].validations)
            }
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const event = Object.assign({}, this.state);
        for (let key in event) {
            const { value, validations } = event[key];
            const { valid, errors } = validator(value, key, validations);
            if (!valid) {
                event[key].valid = valid;
                event[key].errors = errors;
            }
        }
        this.setState({ ...event });
        if (this.state.category.errors.length == 0 && this.state.title.errors.length == 0 && this.state.startDate.errors.length == 0 && this.state.endDate.errors.length == 0 && this.state.timeStartDate.errors.length == 0 && this.state.timeEndDate.errors.length == 0 && this.state.location.errors.length == 0) {
            alert("successfully updated");
            let { category, title, startDate, endDate, location } = event;
            const newstartDate = startDate.value.split('-').reverse().join('-') + ' ' + event.timeStartDate.value;
            const newendDate = endDate.value.split('-').reverse().join('-') + ' ' + event.timeEndDate.value;
            // console.log("newstartDate: " + newstartDate)
            // console.log("newendDate: " + newendDate)
            let month = newstartDate.substring(3, 5), day = newstartDate.substring(0, 2), year = newstartDate.substring(6, 10);
            // console.log(day, month, year)
            let newStartDate = month + '-' + day + '-' + year;
            month = newendDate.substring(3, 5), day = newendDate.substring(0, 2), year = newendDate.substring(6, 10);
            let newEndDate = month + '-' + day + '-' + year;
            newStartDate = newStartDate + ' ' + event.timeStartDate.value;
            // console.log("newStartDate: " + newStartDate)
            newEndDate = newEndDate + ' ' + event.timeEndDate.value;
            const updatedEvent = {
                category: category.value,
                title: title.value,
                startDate: newStartDate,
                endDate: newEndDate,
                location: location.value
            }
            console.log(updatedEvent);
        }
    }
    render() {
        return <>
            <Container>
                <Form style={{ height: 250, margin: "80px 300px  0px 300px" }} onSubmit={this.onSubmit} >
                    <h1 className="font-weight-bold">Update Event <span style={{ color: "red" }}>{this.state.title.value}</span></h1>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Category</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faList} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                id="category"
                                name="category"
                                value={this.state.category.value}
                                onChange={this.onInputChange}
                            >
                                <option value="">Choose...</option>
                                <option value="New Born">New Born</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Party">Party</option>
                            </Form.Control>
                        </InputGroup>
                        {this.state.category.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                                {err}
                            </Form.Text>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Title</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faTag} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                id="title"
                                name="title"
                                placeholder="Enter Title Event"
                                onBlur={this.onInputChange}
                                defaultValue={this.state.title.value}
                            />
                        </InputGroup>
                        {this.state.title.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                                {err}
                            </Form.Text>
                        ))}
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group style={{ width: "270px", marginRight: "60px" }}>
                                <Form.Label className="font-weight-bold">Start Date</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        name="startDate"
                                        type="date"
                                        placeholder="Enter Event Date"
                                        onBlur={this.onInputChange}
                                        defaultValue={this.state.startDate.value}
                                    />
                                </InputGroup>
                                {this.state.startDate.errors.map((err, i) => (
                                    <Form.Text key={i} className="text-danger">
                                        {err}
                                    </Form.Text>
                                ))}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ width: "150px" }}>
                                <Form.Label className="font-weight-bold">Start Time</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faClock} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        name="timeStartDate"
                                        type="time"
                                        onBlur={this.onInputChange}
                                        defaultValue={this.state.timeStartDate.value}
                                    />
                                </InputGroup>
                                {this.state.timeStartDate.errors.map((err, i) => (
                                    <Form.Text key={i} className="text-danger">
                                        {err}
                                    </Form.Text>
                                ))}

                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group style={{ width: "270px", marginRight: "60px" }}>
                                <Form.Label className="font-weight-bold">End Date</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faCalendar} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        name="endDate"
                                        type="date"
                                        onBlur={this.onInputChange}
                                        defaultValue={this.state.endDate.value}
                                    />
                                </InputGroup>
                                {this.state.endDate.errors.map((err, i) => (
                                    <Form.Text key={i} className="text-danger">
                                        {err}
                                    </Form.Text>
                                ))}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group style={{ width: "150px" }}>
                                <Form.Label className="font-weight-bold">End Time</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faClock} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        name="timeEndDate"
                                        type="time"
                                        onBlur={this.onInputChange}
                                        defaultValue={this.state.timeEndDate.value}
                                    />
                                </InputGroup>
                                {this.state.timeEndDate.errors.map((err, i) => (
                                    <Form.Text key={i} className="text-danger">
                                        {err}
                                    </Form.Text>
                                ))}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label className="font-weight-bold">Location</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationArrow} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                id="location"
                                name="location"
                                placeholder="Enter Event location"
                                onBlur={this.onInputChange}
                                defaultValue={this.state.location.value}
                            />
                        </InputGroup>
                        {this.state.location.errors.map((err, i) => (
                            <Form.Text key={i} className="text-danger">
                                {err}
                            </Form.Text>
                        ))}
                    </Form.Group>
                    <Button className="font-weight-bold" variant="primary" style={{ border: "2px solid white" }} type="submit">Save Changes</Button>
                </Form>
            </Container>
        </>;
    }
}
UpdateEventComponent.contextType = WishContext;