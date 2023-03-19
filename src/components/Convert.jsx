import React, { useState } from 'react'

import { useAlert } from 'react-alert'
import axios from "axios";

import {SiConvertio} from "react-icons/si"
import {AiOutlineCloudDownload} from "react-icons/ai"

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';

export const Convert = () => {

    const alert = useAlert()

    const [src, setSrc] = useState(null);
    const [loading, setLoading] = useState(false)

    const handleConvert = (e) => {
        
        e.preventDefault()
        
        setLoading(true)
        axios({
            url: "http://localhost:5000/whisper",
            method: "post",
            responseType: "blob",
          })
            .then((res) => {
              setLoading(false)
              setSrc(URL.createObjectURL(res.data));
              alert.success("File converted successfully")
            })
            .catch((error) => {
              setLoading(false)
              console.log("axios error:", error);
              alert.error("Error occurred while converting your audio file")
            });
      
    
    }
        
    

    return (
      <div className='d-grid gap-2 shadow-sm p-3 mb-5 bg-white rounded'>
          {src?
          <div>
            <h5 className='text-justify'><Badge bg="light" text='dark'>Converted Audio File:</Badge></h5>
            <audio id="audio" controls src={src} />
            <br></br>
            <h5>
              <Badge pill bg="light" text='dark'>
                <a download href={src}>
      		    	  Download Recording
      		      </a> <AiOutlineCloudDownload size={28}/>
              </Badge>
            </h5>
          </div>: null}
          {loading ?<Button variant='outline-success' disabled><Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /><b>Loading ..</b>.</Button>: <Button variant='success' onClick={handleConvert}><SiConvertio size={28}/> <b>Convert</b></Button>}
      </div>
    )
}
