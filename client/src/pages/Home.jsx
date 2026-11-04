import { Link } from 'react-router';
import linkBanner from '../assets/link-banner.png';
import qrBanner from '../assets/qr-banner.png';

function Home() {
    return (
        <section className="min-h-screen pt-20 bg-base-100">
            {/* Hero section */}
            <div className="hero">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">
                            {' '}
                            One Link, Endless{' '}
                            <span className="text-primary">Possibilities.</span>{' '}
                        </h1>
                        <p className="py-6">Shorten long links and generate QR codes instantly.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl grid-cols-1 px-10 sm:p-0 mt-20 mx-auto">
                {/* Shorten Link btn */}
                <div className="aura aura-rainbow">
                    <div className="card card-side bg-base-100 shadow-sm h-full flex-col sm:flex-row">
                        <figure className="sm:size-1/2">
                            <img src={linkBanner} alt="Link Banner" />
                        </figure>
                        <div className="card-body items-center sm:items-stretch">
                            <h2 className="card-title text-primary text-2xl">Shorten Link</h2>
                            <p>Transform long, messy links into short and shareable ones.</p>
                            <div className="card-actions justify-end">
                                <Link to="/link" className="btn btn-primary">
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="hidden stroke-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:inline-block rtl:rotate-180 group-hover:rtl:-translate-x-1"
                                    >
                                        <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* QR Generator btn */}
                <div className="aura aura-rainbow mt-8">
                    <div className="card card-side bg-base-100 shadow-sm h-full flex-col sm:flex-row">
                        <figure className="sm:size-1/2">
                            <img src={qrBanner} alt="QR Banner" />
                        </figure>
                        <div className="card-body items-center sm:items-stretch">
                            <h2 className="card-title text-primary text-2xl">QR Code Generator</h2>
                            <p>Generate beautiful QR codes for links, text, and more.</p>
                            <div className="card-actions justify-end">
                                <Link to="/qrcode" className="btn btn-primary">
                                    Get Started
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="hidden stroke-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 md:inline-block rtl:rotate-180 group-hover:rtl:-translate-x-1"
                                    >
                                        <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Home;
