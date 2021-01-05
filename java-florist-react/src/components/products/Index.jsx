import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddEdit from './AddEdit';

import { List } from './List';

function Products({ match }) {
    const { path } = match;
    
    return (
        <Switch>
            <Route exact path={path} component={List} />
            <Route path={`${path}/add`} component={AddEdit} />
            <Route path={`${path}/edit/:id`} component={AddEdit} />
        </Switch>
    );
}

export { Products };