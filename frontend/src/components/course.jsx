import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



function Course() {
    let {id} = useParams();

    const [course , setCourse] = useState(false)
    useEffect(()=>{
        axios.get()
    })

    return ( 
        <h1>course id</h1>
    );
}

export default Course;