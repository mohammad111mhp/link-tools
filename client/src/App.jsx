import { Routes, Route } from 'react-router';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import QrGenerator from './pages/QrGenerator.jsx';
import QrPanel from './pages/QrPanel.jsx';
import QrContent from './pages/QrContent.jsx';
import LinkShortener from './pages/LinkShortener.jsx';
import LinkPanel from './pages/LinkPanel.jsx';
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/link" element={<LinkShortener />} />
                <Route path="/qrcode" element={<QrGenerator />} />
                <Route path="/link/management" element={<LinkPanel />} />
                <Route path="/qrcode/management" element={<QrPanel />} />
                <Route path="/qrcode/:name" element={<QrContent />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
