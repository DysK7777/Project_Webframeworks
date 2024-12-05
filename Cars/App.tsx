
import React from 'react';
import { FavoriteCarsProvider } from './Context/FavoriteCarsContext';
import { ShowCars } from './Components/ShowCars';
import { FavoriteCars } from './Components/FavoriteCars';

const App = () => {
    return (
        <FavoriteCarsProvider>
            <ShowCars />
            <FavoriteCars />
        </FavoriteCarsProvider>
    );
};

export default App;