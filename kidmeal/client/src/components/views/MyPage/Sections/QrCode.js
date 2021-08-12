import bwipjs from 'bwip-js'
import React, { useEffect, useState } from 'react'

function QrCode(props) {
    
    const [imageUrl, setImageUrl] = useState('')
  
    useEffect(() => {
        const canvas = document.createElement('canvas')
        bwipjs.toCanvas(canvas, {
            bcid: 'qrcode', // Barcode type, 바코드는 code128
            text: '23223', // Pin number
            scale: 3, // 3x scaling factor
            height: 15, // Bar height, in millimeters
            includetext: true, // Show human-readable text
            textxalign: 'center', // Always good to set this
            backgroundcolor: 'FFFFFF',
            padding: 5,
        })
        setImageUrl(canvas.toDataURL('image/png'))
    }, [props.id])
  
    return <div>{imageUrl && <img src={imageUrl} />}</div>
}

export default QrCode


/*

import React, { Component } from 'react'; 
import logo from './logo.svg'; 
import './App.css'; 
import bwipjs from 'bwip-js';  
class App extends Component {
    componentDidMount() {
            bwipjs('mycanvas', 
                { bcid: 'code128',
                  text:  '0123456789', 
                  scale:       3,
                  height:      10,  
                  includetext: true, 
                  textxalign:  'center',
                }, function (err, cvs) { 
                    
                    if (err) {   
                        // Decide how to handle the error 
                        // `err` may be a string or Error object 
                    } else {                 // Nothing else to do in this example...
                    }         
                });   
    }   
            
    render() {     
        return (       
            <div className="App">         
            <div className="App-header">           
            <img src={logo} className="App-logo" alt="logo" />           
            <h2>Welcome to React</h2>         
            </div>         
            <canvas id="mycanvas"></canvas>       
            </div>     
        );   
    } 
}

export default App;
*/