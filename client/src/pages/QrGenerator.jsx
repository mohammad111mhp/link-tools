import { useState, useRef } from 'react';
import { generatePersistentQr, generatePreviewQr } from '../services/qr.service';

function QrGenerator() {
    const [qrType, setQrType] = useState('link');
    const [persistentQr, setPersistentQr] = useState(true);
    const [response, setResponse] = useState(true);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const responseModal = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (persistentQr) {
                const data = await generatePersistentQr(content);
                setResponse(data);
            } else {
                const data = await generatePreviewQr(content);
                setResponse(data);
            }
        } catch (err) {
            setError(err.message || 'Somthing went wrong!');
        } finally {
            setLoading(false);
        }

        responseModal.current.showModal();
    };

    const handleChange = () => {
        setPersistentQr(!persistentQr);
    };

    return (
        <div className="hero min-h-screen">

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
                                <span> {response.message} </span>
                            </div>
                            <img
                                className="m-auto"
                                src={response.data?.imageUrl || response.data}
                                alt="QR Code"
                            />
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
                            <a
                                className="btn bg-primary"
                                href={response.data?.imageUrl || response.data}
                                download={
                                    response.data?.imageUrl
                                        ? `QR${response.data?.imageName}`
                                        : 'QR-Preview.png'
                                }
                            >
                                Download
                            </a>
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

            {/* Qr generator title & description */}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left max-w-xl">
                    <h1 className="text-5xl font-bold mb-6">QR Code Generator</h1>
                    <p className="py-2">Paste your link or text to instantly generate a QR code.</p>
                    <div className="py-2">
                        <div aria-label="status" className="status status-primary mr-2"></div>
                        Select the type of content for your QR code.
                    </div>
                    <div className="py-2">
                        <div aria-label="status" className="status status-primary mr-2"></div>
                        Paste or type your content in the input field.
                    </div>
                    <div className="py-2">
                        <div aria-label="status" className="status status-primary mr-2"></div>
                        If you enable saving, you can view your QR code again later. If not, it will
                        be generated only for this session.
                    </div>
                </div>

                {/* Qr generator form */}
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <form className="fieldset" onSubmit={handleSubmit}>
                            <label className="label">Select QR Code Type</label>
                            <select
                                value={qrType}
                                className="select mb-5 w-full"
                                onChange={(e) => setQrType(e.target.value)}
                            >
                                <option value="link">Link</option>
                                <option value="text">Text</option>
                            </select>

                            {qrType === 'link' ? (
                                <div className="">
                                    <label className="label pb-1">Link</label>
                                    <input
                                        type="url"
                                        className="input validator w-full"
                                        placeholder="Enter your link"
                                        pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9-].*[a-zA-Z0-9])?.)+[a-zA-Z].*$"
                                        title="Must be valid URL"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                    <p className="validator-hint">Must be valid URL</p>
                                </div>
                            ) : (
                                <div className="">
                                    <label className="label pb-1">Text</label>
                                    <textarea
                                        className="textarea w-full max-h-52"
                                        placeholder="Write your text"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                            )}

                            <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-72 border p-4">
                                <legend className="fieldset-legend">Save Option</legend>
                                <label className="label">
                                    <input
                                        type="checkbox"
                                        checked={persistentQr}
                                        onChange={handleChange}
                                        className="toggle toggle-primary"
                                    />
                                    Save QR Code
                                </label>
                            </fieldset>

                            <button className="btn btn-primary mt-4">Start</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QrGenerator;
