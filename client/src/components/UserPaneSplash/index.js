import React from 'react';
import Box from '@material-ui/core/Box';
import './style.css';

export default function UserPaneSplash(){

return(
  <Box className="splashPane" display={{ xs: 'none', md: 'block' }}>
    <div className="content">
      <i className="far fa-comment-dots titleImage"></i>
      <span className="titleText">Converse with anyone with any language</span>
    </div>
  </Box>
)
}