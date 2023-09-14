import React, { useEffect, useState } from 'react'
import './BlogDetailPage.css';
import { Link } from 'react-router-dom';

const BlogDetailPage = (props) => {
    const [post, setPost] = useState({});
    const postId = props.postId;

    useEffect(() => {
        console.log(postId);
        fetch(`http://localhost:3001/posts/${postId}`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error('Fetch Blog Post Error', err))
    }, [postId])

    return (
        <>
            <Link className='back-button' to='/public/blog'>Back To Article List</Link>
            <div className='blog-detail-page'>
                <div className='blog-detail-container'>
                    <h2 className='blog-detail-title'>{post.title}</h2>
                    <p className='blog-detail-author'>Author:{post.author}</p>
                    <p className='blog-detail-content'>{post.content}</p>
                </div>
            </div>
        </>
    )
}

export default BlogDetailPage