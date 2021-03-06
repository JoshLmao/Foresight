import React, { Component } from 'react';
import { 
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';

import Navigation from "../Navigation";
import FourOhFour from "../FourOhFour";
import Calculator from "../Calculator";
import Home from "../Home";

import "../../css/foresight-bs-styling.css";
import "../../css/foresight-generic.css";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Navigation />

                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/app" component={Calculator} />

                    <Route component={FourOhFour} />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
