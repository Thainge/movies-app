import React from 'react';
import styles from './header.module.css';
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className={styles.headerContainer}>
            <ul className={styles.navBar}>
                {[].map((item, index) =>
                    <li key={index} className={styles.liEl}>
                        <Link className={styles.link} state={index} to={`/${item.folderName}${item.id}`}>{item.folderName}</Link>
                    </li>
                )}
                <li className={styles.liEl}>
                    <Link className={styles.link} to={""}>DefaultLibrary</Link>
                </li>
            </ul>
            <div className={styles.center}>
                <h2 className={styles.h1El}>Movies Library</h2>
                <div>powered by <img src={require('../assets/moviedb.png')} className={styles.moviedb}></img></div>
            </div>
        </div>
    );
}

export default Header;
