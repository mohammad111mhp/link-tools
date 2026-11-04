import { Link } from 'react-router';
import notFound from '../assets/not-found.png';

function NotFound() {
    return (
        <>
            <div className="hero hero-overlay bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse align-middle">
                    <img src={notFound} className="max-w-xl rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Error 404 - Page Not Found</h1>
                        <p className="py-6">
                            An Error 404 means the website server cannot find the
                            specific page you asked for. It usually happens because the page was
                            deleted, moved, or typed wrong.
                        </p>
                        <Link to="/" className="btn btn-primary">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotFound;
