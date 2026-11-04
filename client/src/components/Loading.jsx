import { useState, useEffect } from 'react';

function Loading({ show }) {
    const [visible, setVisible] = useState(show);
    const [opacity, setOpacity] = useState(true);

    useEffect(() => {
        if (show) {
            setVisible(true);

            const timer = setTimeout(() => setOpacity(true), 10);
            return () => clearTimeout(timer);
        } else {
            setOpacity(false);
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-base-100 transition-opacity duration-300 ${
                opacity ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <span className="loading loading-bars text-primary w-24"></span>
        </div>
    );
}

export default Loading;
