import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

function Blog() {
    const [posts, setPosts] = useState([]);

    useState(() => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Blog Posts Fetch Error:', error))
    }, []);

    return (
        <div className='blog-page'>
            <h2 className='blog-page-title'>Article List</h2>
            <div className='blog-page-container'>
                <ul>

              
                    {  !Array.isArray(posts) || posts.length === 0 ? (
                        <p>No Blog posts available.</p>
                    ) :( posts.map(post => (
                        <li className='blog-page-post' key={post._id}>
                            <div>
                                <Link className='blog-page-post-title' to={`/public/${post._id}`} >{post.title}</Link>
                            </div>
                            <p className='blog-page-post-author' >Author:{post.author}</p>
                        </li>
                    )))}
                </ul>
            </div>
        </div>
    )
}

export default Blog;