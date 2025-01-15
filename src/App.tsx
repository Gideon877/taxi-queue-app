import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import QueueSections from './components/QueueSections';
// import useAppStore from './store/useQueueStore';
import Home from './components/Home';
import RankDetail from './components/RankDetail';
import useRankStore from './store/useRankStore';


const App: React.FC = () => {
    const fetchRanks = useRankStore(state => state.fetchRanks)
    // const fetchTodayQueues = useAppStore(state => state.fetchTodayQueues);
    // useEffect(() => {
    //     fetchTodayQueues();
    // }, [fetchTodayQueues]);

    useEffect(() => {
        fetchRanks();
    }, [fetchRanks])

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rank/:id" element={<RankDetail />} />
                {/* <Route path="/queue/:id" element={<QueueSections />} /> */}
            </Routes>
        </Router>
    )
}

export default App;