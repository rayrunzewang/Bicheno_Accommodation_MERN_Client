import React, { useState } from 'react'
import Button from './Button/Button';
import Message from './Message/Message';

const BlogCreate = () => {

  const [isSaved, setIsSaved] = useState(false);
  const [isError, setIsError] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);

      if (response.ok) {
        console.log('New Post submitted successfully');
        setIsSaved(true);
        setIsError(false); 
      } else {
        setIsError(true); 
        console.error('Failed to submit data');
      }
    } catch (error) {
      setIsError(true); 
      console.error('Error:', error);
    }
  };
  return (
    <div>
      <div className='blog-create'>
        <form onSubmit={handleSubmit}>
          <div className='blog-create-container'>
            <div>
              <label htmlFor='title'>title:</label>
            </div>
            <div>
              <div>
                <textarea
                  rows="2"
                  cols="50"
                  type="text"
                  id='title'
                  name='title'
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
            </div>
            <div>
              <label htmlFor='author'>author:</label>
            </div>
            <div>
              <textarea
                rows="2"
                cols="50"
                type="text"
                id='author'
                name='author'
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor='content'>content:</label>
            </div>
            <div>
              <textarea
                rows="20"
                cols="50"
                type="text"
                id='content'
                name='content'
                onChange={handleChange}
                required
              ></textarea>
            </div>

          </div>
          <Button type='submit' label='Save' />
        </form>
        {isSaved && <Message /> }
        {isError && <Message message='An error occurred' />} 
      </div>

    </div>
  )
}

export default BlogCreate