import React from 'react';
import { Link } from 'react-router-dom';
import './AccommodationCard.css'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';

const AccommodationCard = ({ property }) => {
  return (
    <Link className='accommodation-page-card' to={`/public/${property._id}`}>

      {/* ------ Card ------ */}
      <div key={property._id}>
        <div className='accommodation-page-image-wrap'>
          <img className='accommodation-page-card-image' src={`http://localhost:3001/${property.images[0].image_url.replace(/\\/g, '/')}`} alt={property.title} />
        </div>
        <div className='accommodation-page-card-text'>
          <h3 className='accommodation-page-card-textline accommodation-page-card-title'>{property.title}</h3>
          <div className='accommodation-page-card-textline accommodation-page-card-facilities'>
            <HotelOutlinedIcon /><p className='accommodation-page-card-facilitie'>{property.bed}</p>
            <WcRoundedIcon /><p className='accommodation-page-card-facilitie'>{property.toliet}</p>
            <DirectionsCarOutlinedIcon /><p className='accommodation-page-card-facilitie'> {property.toliet}</p>
          </div>
          <p className='accommodation-page-card-textline'>address: {property.address}</p>
        </div>
      </div>
    </Link>
  )
}

export default AccommodationCard