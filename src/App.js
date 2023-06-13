import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';


export const Content = withAuthentication(() => (
    <Router>
        <>
           
            <div className="h-full">
                <Switch>
                    <Redirect exact from="/" to="/boards" />
                   
                </Switch>
            </div>
        </>
    </Router>
));

const App = () => <Content />;

export default App;
