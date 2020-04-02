import React from 'react'

class EmployeeDetails extends  React.Component{
constructor(){
    super()
    this.state = {
         name:'',
         phone:'',
         email:'',
         experience:'',
         skills:''
    }
}
componentDidMount(){
    const {name,phone,experience,skills} = this.props.location.state
    this.setState({name,phone,skills,experience})
}
render(){
    return(
        <div>
           
                <h3>{this.state.name}</h3>
                <h3>{this.state.phone}</h3>
                <h3>{this.state.skills}</h3>
                <h3>{this.state.experience}</h3>
            
        </div>
    )
}
}
export default EmployeeDetails