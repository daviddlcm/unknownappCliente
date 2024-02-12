import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Post from './Post';
import App from "./App";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:80/publicaciones', { headers: { token: token } });
        const ppp = response.data.data;
        setPosts(ppp);
      } catch (error) {
        console.log(error);
      }
    };

    const getNewPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:80/publicaciones/nuevas', { headers: { token: token } });
        setPosts(prevPosts => [...prevPosts, response.data.notificacion]); 
      } catch (error) {
        console.log(error);
      } finally{
        setTimeout(getNewPosts, 5000)
      }
    };
    getPosts()
    getNewPosts()

    return () => {
      clearTimeout(getNewPosts);
    }
  }, []);

  return (
    <div>
      <Nav/>

      <div style={{ width: '100%', marginTop: '1vw', display: 'flex', justifyContent: 'center' }}>
        <App/>
      </div>

      {posts.map((post, index) => (
        <div key={index} style={{ width: '100%', marginTop: '1vw', display: 'flex', justifyContent: 'center' }}>
          <Post id_publicacion={post.id_publicacion} id_usuario={post.id_usuario} contenido={post.texto} />
        </div>
      ))}
    </div>
  );
}

export default Home;