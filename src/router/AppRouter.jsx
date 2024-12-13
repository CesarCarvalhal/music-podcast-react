import { Route, Routes } from 'react-router-dom';
import { PodcastRoutes } from '../podcast/routes/PodcastRoutes';



export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<PodcastRoutes />} />
        </Routes>
    );
};
