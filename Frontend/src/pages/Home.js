import { useHistory } from "react-router-dom";
import Feed from '../components/Post/Feed';


const Home = () => {

  const history = useHistory();
  const authNavigate = localStorage.getItem("token");

  return (
    <>
     
      <div className="homeCont">
      { !authNavigate ?
        history.push("/")
        :
        <Feed />
      }
      </div>


    </>

  );
};

export default Home;