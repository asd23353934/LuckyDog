import React, { Component, useState } from 'react';
import ReactPhotoSphereViewer from 'react-photosphere';
import "../../movieSeat.css";

export default function LightBox  ()  {

	let [isOpen, setIsOpen] = React.useState(false);

	const toggleIsOpen = () => {
		setIsOpen(isOpen=true);
	};
	const toggleIsClose = () => {
		setIsOpen(isOpen=false);
	};
	return (
		<div >
			<button className="movieSeatViewBtn" onClick={toggleIsOpen}></button>
			{isOpen ?

				<div  style={{
					position: 'fixed',
					top: '0',
					left: '0',
					right:"0",
					margin:"auto",
					height: '100%',
					width: '100%',
					backgroundColor: 'rgba(0,0,0,0.7)',
					cursor: 'pointer',
					zIndex:"100"
				}}>


					<button className="reactPhotosphereBtn" style={{position:"absolute",top:"40px",right:"5%"}} onClick={toggleIsClose}>close</button>
          
					<div style={{margin:"auto",width:"70%",paddingTop:"100px"}}>
						<ReactPhotoSphereViewer height="700" width="100%" timeAnim={false} src={require("../../movie360.jpg")} />
					</div>
					
				</div>


				: null}
		</div>
	);
};



