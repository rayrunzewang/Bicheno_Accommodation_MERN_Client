import React, { useState, useEffect } from 'react'
import { NavLink, Link, Routes, Route } from 'react-router-dom';
import BlogEditDetail from './BlogEditDetail';
import BlogCreate from './BlogCreate';
import './BlogEdit.css'; 

const BlogEdit = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(error => console.error('获取博客文章列表时发生错误:', error));
  }, [setPosts]);

  return (
    <div>
      <h1 className='blog-edit-title'>Blog Management</h1>
      <div className='blog-edit-area'>
        <div className='blog-edit-container'>
          <h2>Article List</h2>
          <ul>
            {posts.map(post => (
              <li className='blog-edit-post' key={post._id}>
                <NavLink className='blog-edit-post-title' to={`/private/dashboard/blogedit/blogeditdetail/${post._id}`}>{post.title}</NavLink>
              </li>
            ))}
          </ul>
          <Link className='blog-edit-create-button' to='/private/dashboard/blogedit/create'>Create New Post</Link>

        </div>
        <Routes>
          <Route path={`/create`} element={<BlogCreate />} />
          {posts.map(post => {
            return <Route
              key={post._id}
              path={`/blogeditdetail/${post._id}`}
              element={<BlogEditDetail postId={post._id} />} // Pass postId as a prop
            />
          })}
        </Routes>
      </div>

    </div>
  )
}

export default BlogEdit