import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import OrphanagesMap from './pages/OrphanagesMap'
import CreateOrphanage from './pages/CreateOrphanage'
import Orphanage from './pages/Orphanage'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/app' component={OrphanagesMap} />
                <Route path='/orphanage/create' exact component={CreateOrphanage} />
                <Route path='/orphanage/:id' component={Orphanage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
