import React from 'react';
import { ShowCars } from './Components/ShowCars';
import { FavoriteCars } from './Components/FavoriteCars';

const App = () => {
    return (
        <>
            <ShowCars />
            <FavoriteCars />
        </>
    );
};

export default App;