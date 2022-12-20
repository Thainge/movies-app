import React, { useEffect, useState } from 'react';
import ReactPlayer from "react-player"
import movieTrailer from 'movie-trailer';
import styles from './MovieDetails.module.css';
import Fade from 'react-reveal/Fade';
import { ContextFunction } from '../Contexts/ContextProvider';
import { useNavigate, useParams } from 'react-router-dom';

function MovieDetails() {
    const obj = ContextFunction();
    const { allFolders } = obj;

    const navigate = useNavigate()
    let { movieFolder, movieId, id } = useParams();
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [currentMovie, setCurrentMovie] = useState({});

    useEffect(() => {
        let readyId = id - 1;
        let slideShowData = allFolders[readyId].FinishedData;

        let foundIndex = 0;
        slideShowData.forEach((item, index) => {
            let ItemId = item.id.toString();
            if (ItemId === movieId) {
                foundIndex = index;
            }
        });
        setCurrentMovieIndex(foundIndex);

        let foundMovieData = slideShowData[foundIndex];

        const fetchLink = async () => {
            try {
                let Rating = '';
                let Runtime = '';
                if (foundMovieData.IMDBdata) {
                    Rating = foundMovieData.IMDBdata.rating;
                    Runtime = foundMovieData.IMDBdata.runtime;
                }
                setLoading(true);
                const fetchedLink = await movieTrailer(null, { tmdbId: foundMovieData.id })
                let newData = {
                    name: foundMovieData.title,
                    adult: foundMovieData.adult,
                    year: foundMovieData.release_date.slice(0, 4),
                    description: foundMovieData.overview,
                    background: `https://image.tmdb.org/t/p/original/${foundMovieData.backdrop_path}`,
                    score: foundMovieData.vote_average * 10,
                    link: fetchedLink,
                    Runtime: Runtime,
                    Rating: Rating
                }
                setCurrentMovie(newData)
                setLoading(false);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchLink();
    }, [movieId])

    const { name, year, adult, description, background, score, link, Runtime, Rating } = currentMovie;

    const navBack = () => {
        if (currentMovieIndex - 1 < 0) {
            return;
        } else {
            navigate(`/${id}/${movieFolder}/${allFolders[id - 1].FinishedData[currentMovieIndex - 1].id}`);
            let newMovieIndex = currentMovieIndex - 1;
            setCurrentMovieIndex(newMovieIndex)
        }
    }

    const navNext = () => {
        if (currentMovieIndex + 1 > allFolders[id - 1].FinishedData.length) {
            return;
        } else {
            navigate(`/${id}/${movieFolder}/${allFolders[id - 1].FinishedData[currentMovieIndex + 1].id}`);
            let newMovieIndex = currentMovieIndex + 1;
            setCurrentMovieIndex(newMovieIndex)
        }
    }

    const returnArrow = () => {
        navigate(`/${id}/${movieFolder}`);
        setCurrentMovieIndex(0);
    }

    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className={styles.biggerPapa}>
                <div onClick={navBack} className={`${styles.leftArrow} ${styles.arrow}`}>
                    <img className={styles.first} src={require('../assets/last.png')}></img>
                </div>
                <div onClick={navNext} className={`${styles.rightArrow} ${styles.arrow}`}>
                    <img className={styles.first} src={require('../assets/first.png')}></img>
                </div>
            </div>
            <div className={styles.papa} style={{ backgroundImage: 'url(' + background + ')' }}>
                <div className={styles.fixedBackArrow}>
                    <img onClick={returnArrow} title='Back' src={require('../assets/back.png')} className={styles.backArrow}>
                    </img>
                </div>
                {
                    loading
                        ? <div className={styles.loadingContainer}><img src={require('../assets/loading.gif')} className={styles.imageLoading}></img></div>
                        : <div className={styles.container}>
                            <div className={styles.childContainer}>
                                <div className={styles.flexContainer}>
                                    <Fade>
                                        <div className={styles.textContainer}>
                                            <h1 className={styles.header}>{name} ({year})</h1>
                                            <div className={styles.row}>
                                                <div className={styles.tags}>
                                                    {
                                                        adult ? <div className={styles.extra}>R | </div > : <div className={styles.extra}>PG</div>
                                                    }
                                                    <div className={styles.extra}>|</div>
                                                    {
                                                        Runtime ? <div>{Runtime}</div> : <></>
                                                    }
                                                </div>
                                                {
                                                    Rating > 0 ? <div className={styles.starContainer}><img className={styles.star} src={require('../assets/star.png')} />IMDB: <div className={styles.extra2}>{Rating}</div></div> : <></>
                                                }
                                                <div className={styles.starContainer}>Metascore: <div className={styles.border} style={{
                                                    backgroundColor: score < 33 ? 'red' : score < 66 ? 'orange' : 'green',
                                                }}>{score}</div></div>
                                            </div>
                                            <h2>Overview</h2>
                                            <p>{description}</p>
                                        </div>
                                    </Fade>
                                    <Fade>
                                        <div className={styles.videoContainer}>
                                            <ReactPlayer width='100%' height='100%' controls={true} url={link}></ReactPlayer>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </div>

                }
            </div>
        </>
    );
}

export default MovieDetails;
