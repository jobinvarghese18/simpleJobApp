import React from 'react'
import Axios from 'axios'
import {Redirect} from 'react-router-dom'


class AdminDashboard extends React.Component {
    constructor(){
        super()
        this.state = {
            name:'',
            skills:'',
            experience:'',
            appliedDate:'',
            users:[],
            toggle:'1',
            flag:false,
            status:''
        }
    }
    componentDidMount(){
        Axios.get(`http://dct-application-form.herokuapp.com/users/application-forms`)
        .then((response)=>{
            console.log(response.data)
            const users = response.data.filter((ele,i)=>{
                if(i>390){
                    return ele
                }
            })
           
            this.setState({users})
            console.log(this.state.users)
        })
        .catch((err)=>{
            console.log(err)
        })
    
    
    }
    handleFullstack  =()=>{
        this.setState({toggle:1})
        console.log(this.state.toggle)
 }
     handleMean=()=>{
         this.setState({toggle:2})
     }
     handleNode =()=>{
         this.setState({toggle:3})
         
     }
     handleFront = ()=>{
         this.setState({toggle:4})
     }
     handleDetails=(id)=>{
         console.log('hello')
         const user = this.state.users.filter((ele)=>{
             if(ele._id==id){
                 return ele
             }
         })
         const {name,skills,phone,experience} = user[0]
         this.setState({name,skills,phone,experience})
         this.setState({flag:true})
     
     }
     handelShortList= (_id)=>{
        const status = "shortlisted"
       Axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${_id}`,{status})
       .then((response)=>{
           console.log(response.data)
           const {staus} = response.data
           this.setState({status})
       })
       .catch((err)=>{
           console.log(err)
       })
     }
     handleReject =(_id)=>{
        const status = "rejected"
        Axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${_id}`,{status})
        .then((response)=>{
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
     }
    render(){
        console.log(this.state.toggle)
        return(
            <div>
                <h1>Admin Dashboard</h1>
                <table><tbody><tr><td><button onClick={this.handleFullstack}>FULL Stack Developer</button></td><td><button
                 onClick={this.handleMean}>MEAN Stack</button></td><td><button
                 onClick={this.handleNode}>Node js</button></td>
                 <td><button
                 onClick={this.handleFront}>Front End</button></td></tr></tbody></table>
                
                       
                       {this.state.toggle=='1'?<TableRep handleReject={this.handleReject} handelShortList={this.handelShortList} flag={this.state.flag}  name={this.state.name} experience={this.state.experience} phone={this.state.phone} skills={this.state.skills} data={this.state.users.filter(ele=>ele.jobTitle=='FULL Stack Developer')} handleDetails={this.handleDetails}/>:''}
                       {this.state.toggle=='2'?<TableRep   handleReject={this.handleReject} handelShortList={this.handelShortList}flag={this.state.flag} name={this.state.name} experience={this.state.experience} phone={this.state.phone} skills={this.state.skills} data={this.state.users.filter(ele=>ele.jobTitle=='MEAN Stack Developer')} handleDetails={this.handleDetails}/>:''}
                       {this.state.toggle=='3'?<TableRep  handleReject={this.handleReject} handelShortList={this.handelShortList} flag={this.state.flag} name={this.state.name} experience={this.state.experience} phone={this.state.phone} skills={this.state.skills} data={this.state.users.filter(ele=>ele.jobTitle=="Node.js Developer")} handleDetails={this.handleDetails}/>:''}
                       {this.state.toggle=='4'?<TableRep  handleReject={this.handleReject} handelShortList={this.handelShortList}  flag={this.state.flag} name={this.state.name} experience={this.state.experience} phone={this.state.phone} skills={this.state.skills} data={this.state.users.filter(ele=>ele.jobTitle=="Front-End Developer")} handleDetails={this.handleDetails}/>:''}
               
                }
                       
            </div>
        )
    }
}

function TableRep(props){
    return(
        
        <table border='1'>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Technical Skilss</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>View Details</th>
                        <th>Update Application Status</th>
                        
                        </tr>
                        </thead>
                        <tbody>
    {
        props.data.map(ele=>{
            return(
             <tr key={ele._id}>
             <td>{ele.name}</td>
             <td>{ele.skills}</td>
             <td>{ele.experience}</td>
             <td>{ele.createdAt}</td>
             <td><button onClick={()=>{props.handleDetails(ele._id)}}>Details</button></td>
             <td>{ele.status=="applied"?<div><button onClick={()=>props.handelShortList(ele._id)}>Shortlist</button><button onClick={()=>{props.handleReject(ele._id)}}>Reject</button></div>:''}
             {ele.status=="shortlisted"?<div><button>Shortlisted</button></div>:''}
             {ele.status=="rejected"?<div><button>Rejected</button></div>:''}</td>
             {props.flag?<Redirect to={{
                pathname:'/EmployeeDetails',
                state : {
                   name:props.name,
                   experience:props.experience,
                   phone:props.phone,
                   skills:props.skills
                }
            }} />:'' }
         </tr>
         
            )
          })
        }
          </tbody>
                    
          </table>
    )
}
export default AdminDashboard