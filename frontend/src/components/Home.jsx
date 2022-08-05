import { useEffect, useState } from 'react';
import headerImg from '../assets/header.png'
import axios from 'axios' ;
import baseURL from '../utils/baseURL' ;
import { Link } from 'react-router-dom';

function Home() {
    const[ courses , setCourses ] = useState([])

    useEffect(async()=>{
        axios.get(baseURL.courses).then((response)=>{
            if(response.status === 200){
                console.log(response.data.data)
                setCourses(response.data.data)
            }
        })
    })
    return ( 
        <>  
            <img src={headerImg} width='100%' alt="" />     
            
            <h3 className='mt-5'>About</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae fugit dignissimos placeat numquam esse neque aspernatur repudiandae ullam nihil illum aliquid, possimus provident perferendis voluptatum deserunt commodi eveniet. Suscipit, nostrum.</p>


            <h1>Top course</h1>
            {
                    courses.map(course=>{
                            return (
                                <>
                                    <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">{course.title}</h5>
                                        <p class="card-text">{course.description}</p>
                                        <Link href={`/course/${course.id}`} class="btn btn-primary">see More</Link>
                                    </div>
                                    </div>
                                </>
                            )
                    })
            } 
        </> 
    );
}

export default Home;
