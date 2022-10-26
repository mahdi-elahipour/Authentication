import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Authentication from './Components/Authentication';
const App = () => {

    return (
        <div>
            <BrowserRouter>
                <Authentication />
            </BrowserRouter>
        </div>
    );
};

export default App;