//import React, { useContext } from 'react';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { PermMedia } from '@mui/icons-material';
import './CardUpdate.css';
//import axios from "axios";
//import { OnePostContext } from '../CardContext';

const PostUpdate = () => {

  const params = useParams()

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
        console.log(json)
      });
    // pour éviter une boucle infinie
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const isAdmin = (localStorage.getItem("isAdmin"));
  const user = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const id = params.id;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState(null);
  const [isloaded, setIsloaded] = useState(false);
  

  const submitHandler = async (e) => {
    e.preventDefault()
    const userId = user;

    if (file) {
      console.log("il y a un fichier");
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("image", file);
      data.append("name", fileName);
      const imageUrl = fileName;

      console.log("filename", fileName);
      console.log("file", file);
      console.log("imageUrl", imageUrl);

      try {
        await axios({
          method: "post",
          url: `http://localhost:3001/api/upload`,
          headers: { Authorization: "Bearer " + token },
          data,
        })
          .then((res) => {
            console.log(res);
            console.log(res.data.filename);
            localStorage.setItem("imageUrl", res.data.filename);            
            setIsloaded(true);
           
            if (res.data.error) {
              console.log(res.data.error)
            }
          })
      }
      catch (err) {
        console.log(err);
      }
    }

    try {
      const imageUrl = localStorage.getItem("imageUrl");
      setImage(imageUrl);
      console.log("imageUrl", imageUrl)
      //console.log(imageUrl);

      if (imageUrl) {
        console.log("il y a un imageUrl");
        console.log("file =", file);
        await axios({
          method: "put",
          url: `http://localhost:3001/api/publications/${params.id}`,
          data: {
            id,
            userId,
            message,
            imageUrl,
            file,
            isAdmin
          },
          headers: { Authorization: 'Bearer ' + token },
        })
          .then((res) => {
            console.log(res);
            console.log(res.data.filename);
            window.location.reload();
            if (res.data.error) {
              console.log(res.data.error)
            }
          })
      }else{
        await axios({
          method: "put",
          url: `http://localhost:3001/api/publications/${params.id}`,
          data: {
            id,
            userId,
            message,
            isAdmin
          },
          headers: { Authorization: 'Bearer ' + token },
        })
          .then((res) => {
            console.log(res);
            console.log(res.data.filename);
            window.location.reload();
            if (res.data.error) {
              console.log(res.data.error)
            }
          })
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  
  const retourPosts = async () => {
    console.log("dans requete like");
    window.location.href="/home";
  }

 
  //const memoMessage = document.querySelector(".shareInput");
  //memoMessage.innerHTML = message;

  return (

    <>
      <div className="card-share">
        <div className="shareWrapper">
          <div className="shareTop">
            <input
              className="shareInput"
              type="text"
              onChange={(e) => setMessage(e.target.value)}
              defaultValue={onePost.message}
            />
          </div>
        </div>
        <hr className="shareHr" />
        <form className="shareBottom-update" onSubmit={submitHandler}>
          <div className="shareOptions-update">
            <label htmlFor="file" className="shareOption-update">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Ajoutez une photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>
          <button className="shareButton-update" type="submit">Partager</button>
        </form>
        <button className="btn btn-post-update-retour" onClick={() => retourPosts()}>retour
        </button>
      </div>
      <div className="update-cont-image">
        <p classname="h3-update">MISE A JOUR D'UNE PUBLICATION</p>
        <img className="update-image-post" src={isloaded ? image : onePost.imageUrl} alt="img post" />
      </div>
    </>
  );
};


export default PostUpdate;