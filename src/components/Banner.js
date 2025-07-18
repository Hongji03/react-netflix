import axios from "../api/axios";
import React, { useEffect, useState } from 'react';
import requests from "../api/requests";
import styled from "styled-components";
import "./Banner.css"

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // 현재 상영 중인 영화 정보를 가져오기 (여러 영화)
        const request = await axios.get(requests.fetchNowPlaying);

        // 여러 영화 중 영화 하나의 ID를 가져오기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 더 상세한 정보를 가져오기 (비디오 정보도 포함)
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos" },
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    console.log('movie', movie);
    console.log("결과", movie.videos?.results); // undefined or []?

    if (!isClicked) {
        return (
            <header
                className="banner"
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                    backgroundPosition: "top center",
                    backgroundSize: "cover"
                }}
            >
                <div className="banner_contents">
                    <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
                    <div className="banner_buttons">
                        <button
                            className="banner_button play"
                            onClick={() => setIsClicked(true)}
                        >
                            Play
                        </button>
                        <button className="banner_button info">
                            <div className="space"></div> More Information
                        </button>
                    </div>
                    {/* DIV > 2 BUTTONS */}
                    <h1 className="banner_description">
                        {truncate(movie?.overview, 100)}
                    </h1>
                    {/* Description */}
                </div>
                <div className="banner-fadeBottom" />
            </header>
        );
    } else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                        width="640"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        title="YouTube cideo player"
                    ></Iframe>
                </HomeContainer>
            </Container>
        );
    }
}


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;