
import React from 'react';
import axios from "axios"
import { useEffect, useState } from "react"
import MovieSection from './MovieSection';
import {ip} from './global.js'
import './index.css';
import "./watch.css";
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

export const Watched = () => {
  const [WatchedMovieData, setWatchedMovieData] = useState([]);
  const { auth } = useAuth();

const detailURL ="http://"+ip+":8080/getUserProfile/"+auth.user;
useEffect(() => {
  fetchData();
}, []);

const fetchData = () => {
  axios
    .get(detailURL)
    .then((res) => {
      //console.log(res);

      let temp ;
     console.log(res['data']['Watched'].length);
      
      for(var key in res['data']['Watched']){
        console.log(key);
        console.log( res['data']['Watched'][key]);
        let movieData = res['data']['Watched'][key];
        let temp = <MovieSection img={`https://image.tmdb.org/t/p/original/${movieData.Poster_path}`}
        title={movieData.Original_title}
        rating={movieData.Vote_average}
        identifier = {movieData.Id}
        />
        const struct = <div>{temp}</div>

         setWatchedMovieData(WatchedMovieData=>[...WatchedMovieData,
             struct
         ])
    }
});
}
return (
  <div className="moviespage">
  <section id="header">
   <div className="header container">
<div className="nav-bar">
  <div className="brand">
    <a href="#hero">
    <Link to='/'><h1><span>S</span>how <span>B</span>ase</h1></Link>
    </a>
  </div>
</div>
</div>
</section>
    <div class='section-content'>
      <h2>The movies you have watched and rated..</h2>
      <br/>
      <br/>
      <div className='list'>
     
      {WatchedMovieData}
      
      </div>
      </div>
    </div>
  );
};
