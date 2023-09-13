import React, { useState, useEffect } from 'react'
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import PropertyEditDetail from './PropertyEditDetail';
import PropertyCreate from './PropertyCreate';
import './PropertyEdit.css'; 

const PropertyEdit = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/property')
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(error => console.error('error:', error));
  }, [setProperties]);

  return (
    <div>
      <h1 className='property-edit-title'>Property Management</h1>
      <div className='property-edit-area'>
        <div className='property-edit-container'>
          <h2>Property List</h2>
          <ul>
            {properties.map(property => (
              <li className='property-edit-post' key={property._id}>
                <NavLink className='property-edit-property-title' to={`/private/dashboard/Propertyedit/propertyeditdetail/${property._id}`}>{property.title}</NavLink>
              </li>
            ))}
          </ul>
          <Link className='property-edit-create-button' to='/private/dashboard/propertyedit/propertycreate'>Create New Post</Link>

        </div>
        <Routes>
          <Route path={`/propertycreate`} element={<PropertyCreate />} />
          {properties.map(property => {
            return <Route
              key={property._id}
              path={`/propertyeditdetail/${property._id}`}
              element={<PropertyEditDetail property={property._id} />} 
            />
          })}
        </Routes>
      </div>

    </div>
  )
}

export default PropertyEdit