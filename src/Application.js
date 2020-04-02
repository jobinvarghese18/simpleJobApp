import React from 'react'
import Axios from 'axios'

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
            <div>
                <form onSubmit={this.handleSubmit}>
                   <label htmlFor='userName'>FullName</label>
                   <input type="text" name='userName' id='userName'onChange={this.handleInput} value={this.state.userName}/>
                   <br/>
                   <label htmlFor='email'>E-Mail</label>
                   <input type='text' name='email' id='email' value={this.state.email} onChange={this.handleInput}/>
                   <br/>
                   <label htmlFor='contact'>Contact</label>
                   <input type='text' name='contact' id='contact' value = {this.state.contact} onChange={this.handleInput}/>
                   <br/>
                   <label htmlFor='job'>Applying for Job</label>
                   <select id='job' name='job' onChange={this.handleInput} defaultValue={this.state.job} >
                       <option value='Front.End Developer' >Front.End Developer</option>
                       <option value='Node.js Developer'>Node.js Developer</option>
                       <option value='MEAN Stack Developer'>MEAN Stack Developer</option>
                       <option value='FULL Stack Developer'>FullStack  Developer</option>
                   </select>
                   <br/>
                   <label htmlFor="experience">Experience</label>
                   <input type='text' name='experience' id='experience' value = {this.state.experience} onChange={this.handleInput}/>
                   <br/>
                   <label htmlFor='skills'>Technical Skills</label>
                   <input type='textarea' name='skills' id='skills' value ={this.state.skills} onChange={this.handleInput}/>
                   <br/>
                   <input type='submit'  value='Send Application'/>
                </form>

            </div>
        )
    }
}
export default Application