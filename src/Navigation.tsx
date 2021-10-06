import React from 'react';
import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Layout from './components/Layout';
import Analytics from './pages/Analytics';
import { Home } from './pages/Home';
import Login from './pages/Login';
import Todo from './pages/Todo';
import { useAppSelector } from './store';


export default function Navigation() {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    return (
        <Router>
            {
                isLoggedIn ? <Layout>
                    <Switch>
                        <Route path="/todo">
                            <Todo />
                        </Route>
                        <Route path="/analytics">
                            <Analytics />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Layout> : <Switch>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
            }

        </Router>
    )
}