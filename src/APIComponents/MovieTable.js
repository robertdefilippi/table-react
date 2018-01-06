import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'


export default class MovieDataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBaseJSON: null,
            dataBaseItems: null,
        };


    }

    componentWillMount() {
        fetch('https://ghibliapi.herokuapp.com/films').then(results => {
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
            <BootstrapTable striped hover exportCSV data={this.state.dataBaseJSON} pagination={true}
                            options={{'sizePerPage': 5}}>
                <TableHeaderColumn dataField='id' isKey={true} hidden={true}>Id</TableHeaderColumn>
                <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
                <TableHeaderColumn dataField='director'>Director</TableHeaderColumn>
                <TableHeaderColumn dataField='title'>Producer</TableHeaderColumn>
                <TableHeaderColumn dataField='release_date'>Release Date</TableHeaderColumn>
                <TableHeaderColumn dataField='rt_score'>RT Score</TableHeaderColumn>
            </BootstrapTable>

        )
    }
}
