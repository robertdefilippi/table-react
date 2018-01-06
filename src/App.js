import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap'
import './App.css';
import './VehiclesTable.js';
import VehcilesDataTable from "./VehiclesTable";

// TODO Add ability to choose which API from Gihbli you want to access

class DataTable extends Component {
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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTable: ""
        };
        this.handleSetCurrentTableState = this.handleSetCurrentTableState.bind(this);
        this.handleSetTableContainer = this.handleSetTableContainer.bind(this);

    }

    handleSetCurrentTableState(name) {
        this.setState({
            currentTable: name
        });
    }

    handleSetTableContainer() {
        switch (this.state.currentTable) {
            case "Movies":
                console.log("Movies!");
                return <DataTable />;
            case "Vehicles":
                console.log("Vehicles");
                return <VehcilesDataTable />;
            default:
                return <p>Nothing currently selected</p>;
        }
    }

    render() {
        return (
            <div>
                <h1 className="App-title">Welcome to the Studio Gihbli API</h1>
                <h2 className="App-title">You're currently looking at {this.state.currentTable === "Null" ? "Nothing" : this.state.currentTable} </h2>
                <ButtonToolbar>
                    <DropdownButton
                        bsStyle={'default'}
                        title={'Change Studio Gihbli API'}
                        id={1}>
                        <MenuItem name="Movies" onClick={e => this.handleSetCurrentTableState(e.target.name)}>Movies</MenuItem>
                        <MenuItem name="Vehicles" onClick={e => this.handleSetCurrentTableState(e.target.name)}>Vehicles</MenuItem>
                        <MenuItem name="Null" onClick={e => this.handleSetCurrentTableState(e.target.name)}>Nothing</MenuItem>
                    </DropdownButton>
                </ButtonToolbar>
                    <div>{this.handleSetTableContainer()}</div>
            </div>

        );
    }
}

export default App;
