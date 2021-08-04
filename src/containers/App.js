import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends Component {
    constructor() {
        super();

        this.state = {
            robots: [],
            searchField: ""
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(users => {this.setState({robots: users})})
    }

    onSearchChange = (event) => {
        // set the searchField state
        this.setState({"searchField": event.target.value})
    }

    render() {
        const { robots, searchField } = this.state;
        // filter the robots by the searchField
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });

        // if robots.length === 0
        if (!robots.length) {
            return <h1 className="tc moon-gray">Loading...</h1>;
        }

        return (
            <div className="tc">
                <h1>RoboFriends</h1>
                < SearchBox  searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
    
}

export default App;