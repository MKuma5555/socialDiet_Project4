import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
  }
  from 'mdb-react-ui-kit';

function UserRegister() {
    
    const history =useNavigate();
    
    const [errorMessage, setErrorMessage] =useState();
    const [newFormDetails,setNewFormDetails] =useState({
        name:"",
        email:"",
        password:"",
        location:"",
        dob:""
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const fields = Object.fromEntries(formData);
        console.log('feild check',fields);


        axios.post("/api/register", fields)
            .then((response)=> {
                //console.log('register api return',response)
                const nameDataGet=response.config.data
                const parsedData = JSON.parse(nameDataGet);
                const nameData = parsedData.name;
                console.log('check1234',nameData)
                
                history("/")

            }).catch((error ) =>{
                console.log('error', error.response.data);
                setErrorMessage(error.response.data.message)
            });
            // responseet the form fields after submission
            setNewFormDetails({
                name:"",
                email:"",
                password:"",
                location:"",
                dob:""
            });
    };
        const handleChange=(event) =>{
            const {name, value} =event.target;
            setNewFormDetails({
                ...newFormDetails,
                [name]:value,
            })
        }
        
    // const [commentLength,setCommentLength] =useState(0)
    // const handleCommentLength=(num)=>{
    //     setCommentLength(num)
    //     console.log(num)
    // }
    
    
    
      return (
        <>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h2 style={{textAlign:'center'}}>Your Details Sign up</h2>
        {errorMessage === ''? '':<h2 style={{color:'red'}}>{errorMessage}</h2>}
        <form  onSubmit={handleSubmit}>
        <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'
        name="name" onChange={handleChange}  value={newFormDetails.name} required/>
            
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1'  type='email' name='email'
        onChange={handleChange} value={newFormDetails.email} required/>

        <MDBInput wrapperClass='mb-4' label='Password more than 8 chalacters' id='form2' type='password' name='password' 
        onChange={handleChange} value={newFormDetails.password} required/>

        <MDBInput wrapperClass='mb-4' label='location' id='form2' type='text' name='location' 
        onChange={handleChange}  value={newFormDetails.location} required/>

        <MDBInput wrapperClass='mb-4' label='Date of Birth' id='form2' type='date' name="dob"  
        onChange={handleChange}  value={newFormDetails.dob} required/>


        <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      
        </div>
        <MDBBtn className='mb-4' type='submit' style={{textAlign:'center'}} >Register</MDBBtn>
    </form>
     
    
      <div className="text-center">
        <p>Are you a member? <a href='/userLogin' style={{color:'blue'}}>Login </a></p>
        

        <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm"/>
          </MDBBtn>

        </div>
      </div>

    </MDBContainer>

    </>
      );
}

export default UserRegister




