import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import './App.css';


export default class VehcilesDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBaseJSON: null,
            dataBaseItems: null,
        };


    }

    componentWillMount() {
        fetch('https://ghibliapi.herokuapp.com/vehicles').then(results => {
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
                <TableHeaderColumn dataField='name'>Vehicle Name</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='vehicle_class'>Vehicle Class</TableHeaderColumn>
                <TableHeaderColumn dataField='pilot'>Pilot</TableHeaderColumn>
                <TableHeaderColumn dataField='films'>Films</TableHeaderColumn>
                <TableHeaderColumn dataField='url'>URL</TableHeaderColumn>
            </BootstrapTable>

        )
    }
}