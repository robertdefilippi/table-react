import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'


export default class PeopleDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBaseJSON: null,
            dataBaseItems: null,
        };


    }

    componentWillMount() {
        fetch('https://ghibliapi.herokuapp.com/people').then(results => {
            return results.json();

        }).then(jsonResults => {
            this.setState({
                dataBaseJSON: jsonResults
            });
            console.log("Data mounted");
        });

    }

    render() {

        return (
            <BootstrapTable striped hover exportCSV data={this.state.dataBaseJSON} pagination = {true} options = {{'sizePerPage': 5}}>
                <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='age'>Age</TableHeaderColumn>
                <TableHeaderColumn dataField='gender'>Gender</TableHeaderColumn>
                <TableHeaderColumn dataField='eye_color'>Eye Colour</TableHeaderColumn>
                <TableHeaderColumn dataField='hair_color'>Hair Colour</TableHeaderColumn>
            </BootstrapTable>

        )
    }
}