import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import './CardDétails.css';
import axios from "axios";

const CardDétails = () => {

    const params = useParams();
    const history = useHistory();

    // CHARGEMENT D'UNE PUBLICATION PARTICULIERE
    const getOnePost = () => {
        return fetch(`http://localhost:3001/api/publications/${params.id}`, {
            type: "GET",
        }).then((res) => res.json());
    };

    const [onePost, setOnePost] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        !isMounted &&
            getOnePost().then((json) => {
                setOnePost(json);
                setIsMounted(true);
                console.log(json);

            });
        // pour éviter une boucle infinie
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    const userPostId = localStorage.getItem("postUserId");
    console.log(userPostId);
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin");

    console.log(userId, userPostId, isAdmin)

    const token = localStorage.getItem("token");

    // SUPPRESSION D'UNE PUBLICATION
    const deletePost = async (id, onePUid) => {
        setPostUserId(onePUid);
        console.log(postUserId);
        console.log(userId);
        //if (onePUid === userId) {
        await axios({
            method: "delete",
            url: `http://localhost:3001/api/publications/${id}`,
            data: {
                userId,
                id,
                isAdmin
            },
            headers: { Authorization: 'Bearer ' + token },
        });
        history.push("/home");
        //}
    };

    const retourPosts = async (id, like) => {
        console.log("dans requete like");
        history.push("/home");
    }

    const [postUserId, setPostUserId] = useState("");

    // MISE A JOUR D'UNE PUBLICATION PROPRIETAIRE
    const updatePost = (id, onePUid) => {
        setPostUserId(onePUid);
        console.log("dans updatePost")
        console.log("onePost.userId", onePUid);
        console.log("userId", userId);
        //if (onePUid === userId) {

            history.push(`/updatepost/${id}`);
        //}
    }

    return (
        <div className="post">
            <ul className="post-ul">
                <li className="onepost-li">
                    <p>{onePost.message}</p>
                    <div className="cont-image-post">
                    </div>
                    <img src={onePost.imageUrl} alt="img post" />
                    <div className="cont-like-date">
                        <div className="postLikeCounter">{onePost.likes} "like" au total !
                        </div>
                        <div className="updatedAt">
                            {new Date(onePost.updatedAt).toLocaleDateString()}
                        </div>
                    </div>
                    <div className="cont-btn">
                        { (userPostId === userId || isAdmin === "true") &&
                            <div className="cont-div">
                                <button className="btn btn-post-update" onClick={() =>
                                    updatePost(onePost._id, onePost.userId)}>Mise à jour
                                </button>
                                <button className="btn btn-post-delete" onClick={() => deletePost(onePost._id, onePost.userId)}>Supprimer
                                </button>
                            </div>
                        }
                        <button className="btn btn-post-retour" onClick={() => retourPosts(onePost._id, onePost.likes)}>retour
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    );

};

export default CardDétails;

