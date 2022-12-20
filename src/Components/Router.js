import React from 'react';
import { ContextFunction } from '../Contexts/ContextProvider';
import { Routes, Route } from "react-router-dom";
import Movies from '../Pages/Movies';
import Home from '../Pages/Home';
import MovieDetails from '../Pages/MovieDetails';
import PageNotFound from '../Pages/PageNotFound';
import Header from './Other/header';

function RouterComponent() {
    const obj = ContextFunction();
    const { allFolders } = obj;

    return (
        <>
            <Header allFolders={allFolders} />
            {/* All possible routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id/:movieFolder" element={<Movies />} exact />
                <Route path="/:id/:movieFolder/:movieId" element={<MovieDetails />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes >
        </>
    );
}

export default RouterComponent;