import React from 'react';

function Zoom({updateZoom, zoomPercent}) {
  return (
    <div id="slide-container">
      <span id="slider-text">Zoom:{` ${zoomPercent}%`}</span>
      <input onChange={(e) => updateZoom(e)} type="range" min="25" max="200" value={zoomPercent} id="slider"/>
    </div>
  )
}

export default Zoom;