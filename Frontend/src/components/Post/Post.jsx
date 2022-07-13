import React, { useState, /*useHistory*/ } from "react";
import axios from "axios";
import './Post.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

const Post = ({ post, getPosts }) => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    //AFFICHAGE D'UN PUBLICATION PARTICULIERE
    const [postUserId, setPostUserId] = useState("");

    const goToPost = (id, postUid) => {
        setPostUserId(postUid);
        localStorage.setItem("postUserId", postUid);
        console.log(postUserId);
        console.log(userId);
        window.location.href = `/détailpost/${id}`
    }

    //LIKE/DISLIKE D'UNE PUBLICATION  

    const likePost = (id, like) => {
        console.log("suis dans likepost axios")
        axios({
            method: "post",
            url: `http://localhost:3001/api/publications/${id}/like`,
            data: {
                like,
                userId,
                id
            },
            headers: { Authorization: 'Bearer ' + token },
        })
            .then(res => console.log(res))
            .then(result => {
                getPosts();
            }).catch(err => {
                console.log(err)
            })
    }

    const [like, setLike] = useState(post.likes);

    const handleLikePost = (id, usersLiked, usersDisliked) => {
        console.log(post.usersLiked, usersDisliked);
        console.log(userId);

        if (post.usersLiked.find((user) => user === userId)) {
            console.log(userId, "statut: déjà liké");
            likePost(id, 0);
            //setIsLiked(false);
            setLike(like - 1);
        } else {
            console.log(userId, "statut: non liké");
            likePost(id, 1);
            //setIsLiked(true);
            setLike(like + 1);
        }
    }

    return (
        <div className="card">
            <ul className="card-ul">
                <li className="card-li" >
                    <div className="box-message">
                        <p className="cont-message">{post.message}</p>
                    </div>
                    <div className="cont-image">
                        <img className="image-post-home" src={post.imageUrl} alt="img post" />
                    </div>
                    <div className="cont-card-like-date">
                        <div className="btn-likeDislike">
                            {post.usersLiked.find((user) => user === userId)
                                ?
                                <i className="likes" onClick={() => { handleLikePost(post._id, post.usersLiked, post.usersDisliked) }}
                                ><ThumbUpIcon />{like}</i>
                                :
                                <i className="likes" onClick={() => { handleLikePost(post._id, post.usersLiked, post.usersDisliked) }}
                                ><ThumbUpOutlinedIcon />{like}</i>
                            }
                        </div>
                        <div className="card-postLikeCounter">{like} "like" au total !
                        </div>
                        <div className="card-updatedAt">{new Date(post.updatedAt).toLocaleString()}</div>
                    </div>
                    <button className="btn-détail" onClick={() => goToPost(post._id, post.userId)}>
                        Détail publication
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Post;