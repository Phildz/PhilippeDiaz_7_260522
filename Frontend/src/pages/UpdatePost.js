import React from "react";
import { useHistory } from "react-router-dom";
import PostUpdate from "../components/Post/CardUpdate";
import './UpdatePost.css';

const UpdatePost = () => {

    const history = useHistory();
    const authNavigate = localStorage.getItem("token");

    console.log();
    return (
        <div className="updatepost-cont">
            {!authNavigate ?
                history.push("/")
                :
                <PostUpdate />
            }
        </div>
    );
};

export default UpdatePost;