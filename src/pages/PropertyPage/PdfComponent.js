import React from 'react';
import { renderToString } from 'react-dom/server';
import logoImage from '../../assets/logo.jpg'
import './PdfComponent.css'

const PdfComponent = (props) => {
    const property = props.property;
    return (
        <div className='pdf-page'>
            <div>
                <h1 className='pdf-page-title'>{property.title}</h1>
                <p className='pdf-page-description'>房产信息内容1。</p>
                <p className='pdf-page-description'>房产信息内容2。</p>
                <img className='pdf-page-logo-image' src={logoImage} alt="" />
            </div>
        </div>
    );
};

// Export a function to get the HTML content as a string
export const getPdfComponentContent = (property) => {
    return renderToString(<PdfComponent property={property} />);
};
