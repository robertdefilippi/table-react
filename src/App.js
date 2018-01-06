import React, {Component} from 'react';
import {DropdownButton, MenuItem, ButtonToolbar, Jumbotron} from 'react-bootstrap'
import './App.css';
import VehcilesDataTable from "./APIComponents/VehiclesTable";
import PeopleDataTable from "./APIComponents/PeopleTable";
import MovieDataTable from "./APIComponents/MovieTable";

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

    // Render different components based on the state
    handleSetTableContainer() {
        switch (this.state.currentTable) {
            case "Movies":
                return <MovieDataTable/>;
            case "Vehicles":
                return <VehcilesDataTable/>;
            case "People":
                return <PeopleDataTable/>;
            default:
                return <p>Nothing currently selected</p>;
        }
    }

    render() {
        return (
            <div>
                <Jumbotron style={{'paddingLeft': '20px'}}>
                    <h1>Welcome to the Studio Gihbli API</h1>
                    <h3>Select what you would like to see from the dropdown button below.</h3>
                    <h4>You're currently looking
                        at {this.state.currentTable === "" ? "nothing." : this.state.currentTable + "."} </h4>
                    <ButtonToolbar>
                        <DropdownButton
                            bsStyle={'default'}
                            title={'Change Studio Gihbli API'}
                            id={1}>
                            <MenuItem name="Movies"
                                      onClick={e => this.handleSetCurrentTableState(e.target.name)}>Movies</MenuItem>
                            <MenuItem name="Vehicles"
                                      onClick={e => this.handleSetCurrentTableState(e.target.name)}>Vehicles</MenuItem>
                            <MenuItem name="People"
                                      onClick={e => this.handleSetCurrentTableState(e.target.name)}>People</MenuItem>
                            <MenuItem name="Null"
                                      onClick={e => this.handleSetCurrentTableState(e.target.name)}>Nothing</MenuItem>
                        </DropdownButton>
                    </ButtonToolbar>
                </Jumbotron>
                <div>{this.handleSetTableContainer()}</div>
            </div>

        );
    }
}

export default App;
