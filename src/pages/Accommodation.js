import React, { useState } from 'react';
import AccommodationCard from '../components/AccommodationCard/AccommodationCard';
import './Accommodation.css'

function Accommodation() {
    const [properties, setProperties] = useState([]);
    useState(() => {
        fetch('http://localhost:3001/property')
            .then(res => res.json())
            .then(data => setProperties(data))
            .catch(error => console.error('Properties Fetch Error:', error))
    }, []);
    return (
        <div className='accommodation-page'>
            <h1 className='accommodation-page-title'>Our Accommodation</h1>
            <div >
                <div className='accommodation-page-container'>
                    {!Array.isArray(properties) || properties.length === 0 ? (
                        <p>No accommodations available.</p>
                    ) : (
                        properties.map(property => (
                            <AccommodationCard key={property._id} property={property} />
                        ))
                    )}
                </div>

            </div>
        </div>
    )
}

export default Accommodation;