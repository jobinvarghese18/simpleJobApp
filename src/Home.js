import React from 'react'
import {BrowserRouter,Route,Link} from 'react-router-dom'
import Application from './Application'
import AdminDashboard from './AdminDashboard'
import EmployeeDetails from './EmployeeDetails'


function Home(props){
    return (
        <BrowserRouter>
        <div  classNane='container'>
            <Route path='/' component = {Application} exact={true}/>
            <Route path='/admin' component={AdminDashboard}/>
            <Route path='/EmployeeDetails' component={EmployeeDetails}/>
            <Link to='/admin'>admin</Link>
            <Link to='/'>Application</Link>
        </div>
        </BrowserRouter>
    )
}
export default Home