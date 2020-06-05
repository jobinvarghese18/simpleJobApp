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
            status:'',
            jobTitle:['FULL Stack Developer','MEAN Stack Developer','Node.js Developer','Front-End Developer'],
            data:[]
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
            this.setState({data:this.state.users.filter(user=>user.jobTitle === 'FULL Stack Developer')})
            console.log(this.state.users)
        })
        .catch((err)=>{
            console.log(err)
        })
    
    
    }
    handleTitle = (job)=>{
        console.log('hiii there',job)
          this.setState({data:this.state.users.filter((user)=>{
              return user.jobTitle === job
          })})
        
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
           
           const uUser = response.data
           console.log(uUser)
           this.setState(prevState=>({
                data:prevState.data.map(usr=>{
              
                   if(usr._id===uUser._id){
                    
                       return Object.assign({},usr,uUser)
                       
                   }
                   else{
                       return Object.assign({},usr)
                   }
               })
              
           }))
       })
       .catch((err)=>{
           console.log(err)
       })
     }
     handleReject =(_id)=>{
        const status = "rejected"
        Axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${_id}`,{status})
        .then((response)=>{
            const uUser = response.data
            console.log(response.data)
            this.setState(prevState=>({
                data:prevState.data.map(usr=>{
              
                   if(usr._id===uUser._id){
                    
                       return Object.assign({},usr,uUser)
                       
                   }
                   else{
                       return Object.assign({},usr)
                   }
               })
               
           }))
        })
        .catch((err)=>{
            console.log(err)
        })
     }
    render(){
        console.log('data',this.state.data)
        return(
            <div className='container'>
                <h1>Admin Dashboard</h1>
                <div className='row'>
                    <div className='col mt-3'>
                        {
                            this.state.jobTitle.map((job)=>{
                                console.log(this.job)
                                return(
                
                                    <button className='btn btn-info mr-2' onClick={()=>{this.handleTitle(job)}}>{job}</button>
                                )
                            })
                        }
                    </div>
                </div>
               
                        
               <div className='row'>
                   <div className='col-md mt-2'>
                <TableRep data = {{
                    handleReject:this.handleReject,
                    handelShortList:this.handelShortList,
                    flag:this.state.flag,
                    name:this.state.name,
                    experience:this.state.experience,
                    phone:this.state.phone,
                    skills:this.state.skills,
                    data:this.state.data,
                    handleDetails:this.state.handleDetails
                }} />
                </div>
                </div>
                       
            </div>
        )
    }
}

function TableRep(props){
    console.log(props.data.data)
    return(
        
        <table className='table'>
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
        props.data.data.map(ele=>{
            return(
             <tr key={ele._id}>
             <td>{ele.name}</td>
             <td>{ele.skills}</td>
             <td>{ele.experience}</td>
             <td>{ele.createdAt}</td>
             <td><button className='btn btn-primary'onClick={()=>{props.data.handleDetails(ele._id)}}>Details</button></td>
             <td>{ele.status=="applied"?<div><button className='btn btn-success mr-2' onClick={()=>props.data.handelShortList(ele._id)}>Shortlist</button><button className='btn btn-danger' onClick={()=>{props.data.handleReject(ele._id)}}>Reject</button></div>:''}
             {ele.status=="shortlisted"?<div><button className='btn btn-warning'>Shortlisted</button></div>:''}
             {ele.status=="rejected"?<div><button className='btn btn-danger'>Rejected</button></div>:''}</td>
             {props.data.flag?<Redirect to={{
                pathname:'/EmployeeDetails',
                state : {
                   name:props.data.name,
                   experience:props.data.experience,
                   phone:props.data.phone,
                   skills:props.data.skills
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