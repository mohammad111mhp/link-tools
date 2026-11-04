import { useEffect } from 'react';

function Toast({ toast, onClose }) {
    if (!toast) return null;

    const { type, message } = toast;

    const alertClass =
        type === 'success'
            ? 'alert alert-success'
            : type === 'error'
              ? 'alert alert-error'
              : type === 'info'
                ? 'alert alert-info'
                : 'alert alert-warning';

    return (
        <div className="toast toast-top toast-center z-50">
            <div className={alertClass}>
                {type === 'success' && (
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
                )}
                {type === 'error' && (
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
                )}

                <span>{message}</span>

                <button className="btn btn-ghost btn-xs text-current hover:bg-transparent" onClick={onClose}>
                    ✕
                </button>
            </div>
        </div>
    );
}

export default Toast;
