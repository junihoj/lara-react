import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import  Student  from './pages/Student';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';


const App = ()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Student} />
            <Route  path='/add-student' component={AddStudent} />
            <Route path='/edit-student/:id' component={EditStudent} />
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));