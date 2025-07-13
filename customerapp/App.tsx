import React, { useEffect } from 'react';
import { initBackgroundFetch } from './src/utils/backgroundSync';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
    
    useEffect(() => {
        initBackgroundFetch();
    }, []);

    return <AppNavigation />;
};

export default App;