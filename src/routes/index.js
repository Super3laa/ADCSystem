import React from 'react'
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom'
import getRoutes from './routes';

function Routes() {
    return (
        <React.Fragment>
            {
                    <Router>
                        <Switch>
                            {
                                getRoutes().map(({ path, component },i) => {
                                    return <Route exact path={path} key={i} component={component} />
                                })
                            }
                        </Switch>
                    </Router>
            }
        </React.Fragment>
    );
}

export default Routes;