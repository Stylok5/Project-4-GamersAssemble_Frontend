import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DEV_API_URL } from "../consts-data";

const GamePage = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getGame = async () => {
      try {
        const res = await axios.get(`${DEV_API_URL}/${gameId}`);
        setGame(res.data);
        setIsLoading(false);
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGame();
  }, []);

  return (
    <div className="gamePage">
      {isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h1>{game.title}</h1>
            <ul>
              <li>
                <span>Release date: </span>
                {game.release_date}
              </li>
              <li>
                <span>Developer: </span>
                {game.developer}
              </li>
              <li>
                <span>Platforms: </span>
                {game.platforms}
              </li>
              <li>
                <span>Genre: </span>
                {game.genre && game.genre.map((item) => item.name)}
              </li>
              <li>
                <img className="exploreImg" src={game.image} />
              </li>
              <li>
                <span>Description: </span>
                {game.description}
              </li>
            </ul>
            <h2 className="groupstitle">Groups</h2>
            <h4 className="subtitle">
              Create a new group in your profile page by clicking on your
              username located at the bottom or top of the page
            </h4>
            <div className="gamepagetext">
              {game.groups && game.groups.length === 0 ? (
                <h2 className="nogroups"> No groups have been created yet</h2>
              ) : (
                game.groups &&
                game.groups.map((item, ind) => (
                  <Link key={ind} to={`/groups/${item.id}`}>
                    <ul>
                      <h3 style={{ display: "inline" }}>{item.name}</h3>
                      <p className="likestext">Likes: {item.likes}</p>
                      <p className="dislikestext">Dislikes: {item.dislikes}</p>
                    </ul>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default GamePage;
