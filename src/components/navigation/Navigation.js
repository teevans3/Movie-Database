import React, {useState, useContext} from 'react';
import Search from './Search';
import {ImageConfigContext} from '../../context/ImageConfig';
import {Link} from 'react-router-dom';
import classes from './Navigation.module.css';

const Navigation = () => {
  const {imageConfig, setImageConfig} = useContext(ImageConfigContext);

  return (
    <div>
      <div className={classes.Nav}>
        <div className={classes.NavHome}>
          <Link to="/"><button className={classes.NavLink + " " + classes.HomeLink}>Home</button></Link>
        </div>
        <div className={classes.NavGenre}>
          <Link to="/comedy"><button className={classes.NavLink}>Comedy</button></Link>
          <Link to="/action"><button className={classes.NavLink}>Action</button></Link>
          <Link to="/drama"><button className={classes.NavLink}>Drama</button></Link>
          <Link to="/thriller"><button className={classes.NavLink}>Thriller</button></Link>
          <Link to="/scifi"><button className={classes.NavLink}>Sci-Fi</button></Link>
          <Link to="/fantasy"><button className={classes.NavLink}>Fantasy</button></Link>
          <Link to="/horror"><button className={classes.NavLink}>Horror</button></Link>
        </div>
      </div>
      <Search baseURL={imageConfig.baseURL} posterSizes={imageConfig.posterSizes} />
    </div>

  )
}

export default Navigation;
