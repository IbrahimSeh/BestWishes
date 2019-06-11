import React from 'react'



export default class SearchedEventComponent extends React.Component {
    render() {
        return <>
            <tr onClick={() => this.props.click(this.props.id)}  >
                <td>{this.props.id}</td>
                <td>{this.props.category}</td>
                <td>{this.props.title}</td>
                <td>{this.props.startDate}</td>
                <td>{this.props.endDate}</td>
                <td>{this.props.location}</td>
            </tr>
        </>;
    }
}