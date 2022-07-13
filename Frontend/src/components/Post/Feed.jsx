import React, { useState, useEffect } from "react";
import Post from './Post'
import SharePost from './SharePost';
import './Feed.css';

const Feeds = () => {

    const getPosts = () => {
        return fetch("http://localhost:3001/api/publications", {
            type: "GET",
        }).then((res) => res.json())
        .then((json) => {
            setPost(json);
            setIsMounted(true);
            console.log(json)
        });
    };

    const [post, setPost] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        !isMounted &&
            getPosts();
    }, [isMounted]);

    return (
        <div className='feed'>
            <div className="feedWrapper">
            <SharePost />
            {post.map((p) => (
                <Post key={p._id} post={p} getPosts={getPosts}/>
            ))}
            </div>
            
        </div>
    );
};

export default Feeds;