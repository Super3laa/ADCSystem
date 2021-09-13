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
                                getRoutes().map(({ path, component }) => {
                                    return <Route exact path={path} component={component} />
                                })
                            }
                        </Switch>
                    </Router>
            }
        </React.Fragment>
    );
}

export default Routes;