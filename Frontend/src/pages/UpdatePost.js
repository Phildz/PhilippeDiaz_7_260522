import React from "react";
import PostUpdate from "../components/Post/CardUpdate";
import './UpdatePost.css';
//import PostList from "../components/Post/Card";
//import { OnePostContext } from "../AppContext";

const UpdatePost = () => {
    
    console.log();
    return (
        <div className="updatepost-cont">
            Mise à jour d'une publication            
            <PostUpdate />
            
        </div>
    );
};

export default UpdatePost;