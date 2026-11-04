import { useState, useRef } from 'react';
import { shortenLink } from '../services/link.service.js';
import { copyToClipboard } from '../utils/clipboard.js';

function LinkShortener() {
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const responseModal = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await shortenLink(url);
            setResponse(data);
        } catch (err) {
            setError(err.message || 'Somthing went wrong!');
        } finally {
            setLoading(false);
        }

        responseModal.current.showModal();
    };

    const handleCopy = async () => {
        const isCopied = await copyToClipboard(response.data.shortUrl);

        if (isCopied) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <section className="hero min-h-screen">
            {/* Response modal */}
            <dialog ref={responseModal} className="modal">
                <div className="modal-box">
                    {response ? (
                        <div className="flex-col text-center">
                            <div role="alert" className="alert alert-success alert-soft mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{response.message}</span>
                            </div>
                            <a
                                className="block bg-primary p-2 rounded-md font-bold text-sm"
                                href={response.data.shortUrl}
                            >
                                {response.data.shortUrl}
                            </a>
                        </div>
                    ) : (
                        <div role="alert" className="alert alert-error alert-soft">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span> {error} </span>
                        </div>
                    )}
                    <div className="modal-action">
                        {response ? (
                            <button className="btn bg-primary" onClick={handleCopy}>
                                {copied ? (
                                    <div className="flex justify-center align-middle gap-1">
                                        Copied
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                ) : (
                                    'Copy'
                                )}
                            </button>
                        ) : (
                            <p></p>
                        )}
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Shortener link title & description */}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left max-w-xl">
                    <h1 className="text-5xl font-bold mb-6">Shortener Link</h1>
                    <p className="py-2">
                        Paste your long URL into the field and get a clean, shortened link in just a
                        moment. You can then share it anywhere with ease.
                    </p>
                    <div className="py-2">
                        <div aria-label="status" className="status status-primary mr-2"></div>
                        Paste or type your URL in the input field.
                    </div>
                    <div className="py-2">
                        <div aria-label="status" className="status status-primary mr-2"></div>
                        Track the performance of your links at a glance. The links panel shows how
                        many times each link has been clicked.
                    </div>
                    <div className="py-2">
                        <div aria-label="status" className="status status-primary mr-2"></div>
                        Manage your shortened links effortlessly. From the links panel you can
                        delete any link whenever you need.
                    </div>
                </div>

                {/* Link shortener form */}
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form className="fieldset" onSubmit={handleSubmit}>
                            <label className="label pb-1">Long Link</label>
                            <input
                                type="url"
                                className="input validator w-full"
                                placeholder="Enter your long link here."
                                pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                                title="Must be valid URL"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                            />
                            <p className="validator-hint">Must be valid URL</p>
                            <p className="">
                                Enter link like this:{' '}
                                <span className="text-primary">https://example.com</span>
                            </p>

                            <button
                                disabled={loading}
                                className="btn btn-primary mt-4"
                                type="submit"
                            >
                                Start
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LinkShortener;
