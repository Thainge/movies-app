import React from 'react';
import styles from './PageNotFound.module.css';

function PageNotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <div className={styles.textChild}>
                    <h1>Page Not Found</h1>
                    <p>We can't find the page you're looking for.
                        You can return to the previous page or visit the homepage</p>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;