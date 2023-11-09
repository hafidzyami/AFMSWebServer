"use client"

import React, { useState, useEffect} from 'react'
import Navbar from '../../../components/Navbar'
import servoMotor from '../../../public/servomotor.png'
import servoMotorActive from '../../../public/servomotorActive.png'
import ledpin from '../../../public/ledpin.png'
import ledActive from "../../../public/ledActive.png"
import Image from 'next/image'
import socketIOClient from 'socket.io-client';
import Footer from '../../../components/Footer'

const socket = socketIOClient('http://hafidziot.hrbvbrbgevfmaphx.southeastasia.azurecontainer.io:3001');


function servoLedMonitor() {

    const [LEDDuration, setLEDDuration] = useState();
    const [LEDStatus, setLEDStatus] = useState(false);
    const [servoDuration, setServoDuration] = useState();
    const [servoStatus, setServoStatus] = useState(false);

    useEffect(() => {
        socket.on('mqttMessage', (data) => {
          setServoDuration(data)
          setServoStatus(true);
          if(data == 0){
            setServoStatus(false);
          }
        });
        return () => {
          socket.off('mqttMessage');
        };
      });

    useEffect(()=>{
        socket.on('mqttMessage2', (data) => {
            setLEDDuration(data)
            setLEDStatus(true);
            if(data == 0){
              setLEDStatus(false);
            }
          });
        return () => {
            socket.off('mqttMessage2');
        };
    })

  return (
    <div>
        <Navbar/>
        <h2 className='text-center mt-3'>Servo Monitoring</h2>
        <div className='row d-flex justify-content-center mt-5'>
            <div className='col-lg-3 col-md-3 mb-4 mx-5'>
            <div className="card">
                <Image
                    src={servoStatus == true ? servoMotorActive : servoMotor}
                    width={320}
                    height={320}
                    className='card-img-top py-3 px-3'
                    alt='servo'
                />
                <div className="card-body">
                    <h5 className="card-title">Servo Motor</h5>
                    {servoStatus == true ? <p className='text-success'>Servo Aktif</p> :
                    <p className='text-danger'>Servo Tidak Aktif</p>}
                    <p>Durasi : {servoDuration} detik</p>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-3 mb-4 mx-5'>
            <div className="card">
                <Image
                    src={LEDStatus == true ? ledActive : ledpin}
                    width={320}
                    height={320}
                    className='card-img-top py-3 px-3'
                    alt='led'
                />
                <div className="card-body">
                    <h5 className="card-title">LED</h5>
                    {LEDStatus == true ? <p className='text-success'>LED Aktif</p> :
                    <p className='text-danger'>LED Tidak Aktif</p>}
                    <p>Durasi : {LEDDuration} detik</p>
                </div>
              </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default servoLedMonitor