import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Index from '../pages/Index';
import Cadastro from '../pages/Cadastro';
import Lista from '../pages/Lista';

function Routes() {
    return(
        <Switch>
            <Route path="/" exact component={Index}/>
            <Route path="/cadastro" component={Cadastro}/>
            <Route path="/lista" component={Lista}/>
        </Switch>
    );
}

export default Routes;