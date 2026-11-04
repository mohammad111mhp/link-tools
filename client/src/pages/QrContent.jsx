import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getQRCode } from '../services/qr.service';

function QrContent() {
    const { name } = useParams();
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState('');
    const [isUrl, setIsUrl] = useState(false);
    const [error, setError] = useState('');

    const loadQRCode = async () => {
        setLoading(true);

        try {
            const response = await getQRCode(name);
            setContent(response.data);
        } catch (err) {
            setError(err.message || 'Somthing went wrong!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQRCode();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen bg-base-200 flex justify-center items-center">
                {' '}
                <p className="text-5xl font-bold text-primary"> {error} </p>{' '}
            </div>
        );
    }

    return (
        <section>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                    <div className="max-w-xl">
                        <h1 className="text-5xl font-bold text-primary">QR Content</h1>
                        {loading ? (
                            <div className="flex flex-col gap-4 py-6">
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        ) : (
                            <p className="py-6 text-justify">{content.content}</p>
                        )}

                        {isUrl ? (
                            <button className="btn btn-primary">
                                <a href={content.content}> Open Link </a>
                            </button>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QrContent;
