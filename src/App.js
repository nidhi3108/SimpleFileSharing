// import logo from './logo.svg';
// document.queryslector id and class arereplaced by useref in recat
import React, { useEffect, useState } from "react";
import {useRef} from "react";
import './App.css';
import download from './assets/download.jpg'
// import { post } from "../../server/router/utilrouter";

function App() {
  const [selfile,setSelFile]=useState('');
  const fileInputRef=useRef();

  const submit = async (formdata) => {
    // formdata.name=setSelFile;
    formdata.file = selfile;
    console.log(formdata);

    const response = await fetch("http://localhost:8000/file/add", {
      method: 'POST',
      body: formdata,
    });
   console.log(response);
  };


  const onuploadclick=()=>{
    // .current se dom element aata hai
    fileInputRef.current.click();
  }
  console.log(selfile);


 const uploadfile=(e)=>{
  const file=e.target.files
     setSelFile(file.name)
     console.log(setSelFile);
     const data= new FormData();
     data.append('myfile',file)
     fetch("http://localhost:8000/util/uploadfile",{
      method: "POST",
      body: data,
     })
     .then((res)=>{
        if(res.status===200)
        console.log("file uploaded");
        else
        console.log("kuch to gadbad h");
     })
     .catch((err)=>{
      console.log("file not uploaded");
     })
 }

  return (
    <div className="container">
      <img src={download} alt=""/>
      <div className="wrapper">
        <h1>Simple File Sharing</h1>
        <p>Upload and share the download link.</p>
        <button onClick={onuploadclick}>Upload</button>
        <input type="file"
        ref={fileInputRef} 
        style={{display:"none"}}
        onChange={uploadfile}
        // onChange={(e)=> setFile(e.target.files[0])}
        />
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
