import { PermMedia } from '@mui/icons-material';
import axios from "axios";
import { useState } from "react";
import './SharePost.css';

export default function Share() {

    const user = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault()
        const userId = user;

        if (file && message) {
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
                        if (res.data.error) {
                            console.log(res.data.error)
                        }
                    })
            }
            catch (err) {
                console.log(err);
            }
            try {
                const imageUrl = localStorage.getItem("imageUrl");
                //console.log(imageUrl);

                if (imageUrl) {
                    await axios({
                        method: "post",
                        url: `http://localhost:3001/api/publications`,
                        data: {
                            userId,
                            message,
                            imageUrl
                        },
                        headers: { Authorization: 'Bearer ' + token },
                    })
                        .then((res) => {
                            console.log(res);
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
        } else {
            alert("Message et/ou image absents");
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="" alt="" className="shareProfileImg" />
                    <input
                        id="message"
                        placeholder="Quoi de neuf ?"
                        className="shareInput"
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </div>
            <hr className="shareHr" />
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Ajouter une photo</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setFile(e.target.files[0])} />
                    </label>
                </div>
                {(file && message) &&
                    <button className="shareButton" type="submit">Partager</button>
                }
            </form>
        </div>
    )

}