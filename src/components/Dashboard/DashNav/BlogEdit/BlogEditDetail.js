import React, { useState, useEffect } from 'react'
import './BlogEditDetail.css';
import './BlogCreate.css';
import Button from '../../../Button/Button';
import Message from '../../../Message/Message';

const BlogEditDetail = (props) => {

  const [posts, setPosts] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
  });
  const postId = props.postId

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = {
      title: formData.title || posts.title,
      author: formData.author || posts.author,
      content: formData.content || posts.content,
    };

    try {
      const response = await fetch(`http://localhost:3001/posts/${posts._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });
      console.log(formData);

      if (response.ok) {
        setIsSaved(true)
        setIsError(false); 
      } else {
        setIsError(true); // Set error state on failure
        console.error('Failed to submit data');
      }
    } catch (error) {
      setIsError(true); // Set error state on failure
      console.error('Error:', error);
    }
  };

  const deletePost = async (postId, prevPosts, setPosts) => {
    try {
      const res = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      if (!res.ok) {
        throw new Error('Delete post error');
      }
      setIsDeleted(true);
    } catch (error) {
      setIsError(true); 
      console.error('Delete post error:', error)
    }
  }

  return (
    <div className='blog-edit-detail'>

      <form className='blog-edit-detail-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">title: </label>
        </div>
        <div>
          <textarea
            rows="2"
            cols="50"
            type="text"
            id='title'
            name='title'
            defaultValue={posts.title}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">author: </label>
        </div>
        <div>
          <textarea
            rows="2"
            cols="50"
            type="text"
            id='author'
            name='author'
            defaultValue={posts.author}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="content">content: </label>
        </div>
        <div>
          <textarea
            rows="20"
            cols="50"
            type="text"
            id='content'
            name='content'
            defaultValue={posts.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <Button label='Save' />
      </form>
      <Button onClick={() => deletePost(postId)} label='Delete' />
      {isSaved && <Message message='Data saved successfully'  />}
      {isDeleted && <Message message='Post deleted successfully'  />}
      {isError && <Message message='An error occurred' />} 
    </div>
  )
}

export default BlogEditDetail