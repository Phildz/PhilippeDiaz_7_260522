import React from 'react';
import { useHistory } from "react-router-dom";
import CardDétails from '../components/Post/CardDétails';

const DétailPost = () => {

    const history = useHistory();
    const authNavigate = localStorage.getItem("token");

    return (
        <div>
            {!authNavigate ?
                history.push("/")
                :
                <CardDétails />
            }
        </div>
    );
};

export default DétailPost;