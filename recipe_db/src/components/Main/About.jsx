import React from 'react';
import '../../css/Main/About.css'
import linkedIn from '../../images/linkedin-logo-png-1838.png'
import github from '../../images/github-logo-icon-16174.png'
import m from '../../images/M Logo.png'
import Tooltip  from 'react-bootstrap/Tooltip';
import OverlayTrigger  from 'react-bootstrap/OverlayTrigger';


function About(props) {
    return (
        <div className = "about">
          <div>
            This site was created as the capstone project for GA's Software Engineering Immersive by Max Robbins
          </div>
            <div className = "aboutLinks">
              <a href = 'https://www.linkedin.com/in/maxwell-robbins-1b614a23/'><img className = "linkImg" src = { linkedIn } alt = "linkedin"/></a>
              <OverlayTrigger
                    placement='top'
                    overlay={
                        <Tooltip>Portfolio</Tooltip>
                    }>
              <a href = 'https://www.max-robbins.com'><img className = "linkImg" src = { m } alt = "mlogo"/></a>
              </OverlayTrigger>
              <a href = 'https://github.com/mjrobbins18'><img className = "linkImg" src = { github } alt = "github"/></a>
              
            </div>
          

        </div>
    

    )
}

export default About;