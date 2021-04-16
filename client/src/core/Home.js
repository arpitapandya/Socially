import React from "react";
import "./Home.css";
import Posts from "../post/Posts";

const Home = () => (
    <div>
        <div className="jumbotron">
            <h2>Welcome</h2>
            <p className="lead"></p>
        </div>
        <div className="container">
            <Posts />
        </div>
    </div>
);

export default Home;