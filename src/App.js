import React, {Component} from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import './App.css';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBaseJSON: {},
            dataBaseItems: []
        };
    }

    componentDidMount() {
        fetch('https://ghibliapi.herokuapp.com/films').then(results => {
            return results.json();

        }).then(jsonResults => {
            this.setState({
                dataBaseJSON: jsonResults
            });
            return jsonResults

        }).then(jsonResults => {
            Object.keys(jsonResults).forEach(movieObject => {
                let currentRowNum = this.state.dataBaseItems.length;
                console.log(currentRowNum);
                this.setState({
                    // Using spread attributes " ... " below to expand the array object
                    dataBaseItems:
                        [
                            ...this.state.dataBaseItems, <DataRow rowNum={currentRowNum + 1 }
                                                                  key={this.state.dataBaseJSON[movieObject].id}
                                                                  item={this.state.dataBaseJSON[movieObject]}/>
                        ]
                });
            });
        })
    }

    render() {

        return (
            <table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Producer</th>
                    <th>Release Date</th>
                    <th>Rotten Tomato Score</th>
                </tr>
                </thead>
                <tbody>
                {this.state.dataBaseItems}
                </tbody>
            </table>

        )
    }
}

// This is the react component for the data rows, that we collect from
// the database we connect and add data to. The <td> comes from the
// parent component
// <tr> is the table row, and <td> is the table data
class DataRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.rowNum}</td>
                <td>{this.props.item.title}</td>
                <td>{this.props.item.director}</td>
                <td>{this.props.item.producer}</td>
                <td>{this.props.item.release_date}</td>
                <td>{this.props.item.rt_score}</td>
            </tr>
        )
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <h1 className="App-title">Welcome to React</h1>
                <div>
                    <DataTable/>
                </div>
            </div>

        );
    }
}

export default App;
