import React,{useState, usestate} from "react";
import { TextField,Box,Button } from "@mui/material";
import axios from "axios";

export const Login =()=>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState(''); 

    const host = window.location.host;
    // const host = "localhost:8000"

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(email==="" || pass==="")
            {
                return ;
            }
        
        await axios.post("http://"+host+"/api/login",{
          email:email,
          password:pass  
        }).then((response)=>{
            
            downloadTxtFile(JSON.stringify(response.data))
        })
    }

    const downloadTxtFile = (text) => {
        const element = document.createElement("a");
        const file = new Blob([text], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = host+".key";
        document.body.appendChild(element);
        element.click();
      }

    return( 
        <>
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <h1>Login</h1>

        <TextField
          required
          id="outlined-email-input"
          label="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>setPass(e.target.value)}
        />
        <Button  variant="contained" onClick={handleSubmit}>login</Button>
        </Box>
    
        </>
    );
       
    
}