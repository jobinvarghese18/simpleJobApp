import React from 'react'
import Axios from 'axios'
// import '../src/app.css'

class Application extends React.Component{
    constructor(){
        super()
        this.state = {
            userName:'',
            email:'',
            contact:'',
            job:'',
            experience:'',
            skills:''
        }
    }
    handleInput =(e)=>{
     this.setState({[e.target.name]:e.target.value})
     
    }
    handleSubmit =(e)=>{
        e.preventDefault()
        const data = {
            name:this.state.userName,
            email:this.state.email,
            phone:this.state.contact,
            skills:this.state.skills,
            jobTitle:this.state.job,
            experience:this.state.experience
            
        }
        Axios.post(`http://dct-application-form.herokuapp.com/users/application-form`,data)
        .then((response)=>{
            console.log(response.data)
        })
        .catch((err=>{
            console.log(err)
        }))
    }
    render(){
        
        return(
            <div className='row'>
                
                <div className='col-md-6 offset-md-3'>
                <h2>Job Application</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                    <label htmlFor='userName'>FullName</label>
                   <input type="text" name='userName' id='userName'onChange={this.handleInput} value={this.state.userName}
                   className='form-control'/>
                    </div>
                   
                   <div className='form-group'>
                   <label htmlFor='email'>E-Mail</label>
                   <input type='text' name='email' id='email' value={this.state.email} onChange={this.handleInput}
                   className='form-control'/>
                   </div>
                   
                   <div className='form-group'>
                   <label htmlFor='contact'>Contact</label>
                   <input type='text' name='contact' id='contact' value = {this.state.contact} onChange={this.handleInput}
                   className='form-control'/>
                   </div>

                   <div className='form-group'>
                   <label htmlFor='job'>Applying for Job</label>
                   <select className="styled-select" id='job' name='job' onChange={this.handleInput} defaultValue={this.state.job}
                   className='form-control' >
                       <option value='Front-End Developer'>Front.End Developer</option>
                       <option value='Node.js Developer'>Node.js Developer</option>
                       <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                       <option value='FULL Stack Developer'>FullStack  Developer</option>
                   </select>
                   </div>

                   <div className='form-group'>
                   <label htmlFor="experience">Experience</label>
                   <input type='text' name='experience' id='experience' value = {this.state.experience} onChange={this.handleInput}
                   className='form-control'/>
                   </div>

                   <div className='form-group'>
                   <label htmlFor='skills'>Technical Skills</label>
                   <input type='textarea' name='skills' id='skills' value ={this.state.skills} onChange={this.handleInput}
                   className='form-control'/>
                   </div>

                   <input type='submit' className="btn btn-primary" value='Send Application'/>
                </form>
            </div>
            </div>
        )
    }
}
export default Application