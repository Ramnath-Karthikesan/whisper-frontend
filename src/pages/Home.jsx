import React from 'react'

import RecordAudio from '../components/RecordAudio';
import { FileUpload } from '../components/FileUpload';
import Alert from 'react-bootstrap/Alert';

export const Home = () => {
  return (
    <div style={{backgroundColor: "#B2B2B2"}}>
      <div className='container' > 
      <Alert key="danger" variant="danger" className='mt-5'>
        Alert! Due to web hosting limitations the whisper to normal speech converter does not work
        <br></br>
        Please proceed to the <b>MOS Testing</b> section to rate our results
      </Alert>
        <div className='row mt-5'>
          <div className='col-lg-6 col-12' >
            
            <FileUpload />
          </div>
          <div className='col-lg-6 col-12' style={{marginBottom: "50px"}}>
            
            <RecordAudio />
          </div>
        </div>
      </div>
    </div>
  )
}
