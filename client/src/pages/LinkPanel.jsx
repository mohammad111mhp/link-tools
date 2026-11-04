import { useEffect, useRef, useState } from 'react';
import { deleteLink, deleteMultipleLinks, getLinks } from '../services/link.service';
import DateDisplay from '../components/DateDisplay';
import Toast from '../components/Toast';
import TableSkeleton from '../components/TableSkeleton';

function LinkPanel() {
    const [links, setLinks] = useState([]);
    const [selectedLinks, setSelectedLinks] = useState([]);
    const [deleteReq, setDeleteReq] = useState(null);
    const [linkDetails, setLinkDetails] = useState(null);
    const [allLinksChecked, setAllLinksChecked] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toast, setToast] = useState(null);
    const detailsModal = useRef();
    const deleteModal = useRef();

    const loadLinks = async () => {
        setLoading(true);

        try {
            const response = await getLinks();
            setLinks(response.data);
        } catch (err) {
            setError(err.message || 'Somthing went wrong!');
        } finally {
            setLoading(false);
        }
    };

    const showToast = (type, message) => {
        setToast({ type, message });

        setTimeout(() => setToast(null), 3000);
    };

    const closeModals = () => {
        detailsModal.current.close();
        deleteModal.current.close();
    };

    const detailsHandler = (id) => {
        const link = links.find((item) => item.id === id);
        setLinkDetails(link);

        detailsModal.current.showModal();
    };

    const handleSelectedLinks = () => {
        const checkboxElems = document.querySelectorAll('.link-checkbox');
        let selectedIds = [];

        checkboxElems.forEach((elem) => {
            if (elem.checked) selectedIds.push(elem.id);
        });

        setSelectedLinks(selectedIds);
    };

    const handleSelectAllLinks = () => {
        const checkboxElems = document.querySelectorAll('.link-checkbox');
        setAllLinksChecked(!allLinksChecked);

        checkboxElems.forEach((elem) => {
            elem.checked = allLinksChecked;
        });
        handleSelectedLinks();
    };

    const handleDeleteModal = () => {
        deleteModal.current.showModal();
    };

    const handleDeleteReq = async () => {
        if (!deleteReq) return showToast('error', 'Select an item to delete!');

        try {
            if (deleteReq.type === 'single') {
                await deleteLink(deleteReq.id);
                loadLinks();
                closeModals();
                showToast('success', 'Link deleted successfully.');
            } else {
                await deleteMultipleLinks(deleteReq.ids);
                loadLinks();
                closeModals();
                setSelectedLinks([]);
                showToast('success', 'Links deleted successfully.');
            }
        } catch (err) {
            showToast('error', 'Something went wrong!');
        }
    };

    useEffect(() => {
        loadLinks();
    }, []);

    return (
        <div className="overflow-x-auto min-h-screen my-10">
            <Toast toast={toast} onClose={() => setToast(null)} />

            {/* Modal for confirming deletion (single or bulk) */}
            <dialog ref={deleteModal} className="modal">
                <div className="modal-box">
                    <p className="py-4 text-center">Are you sure you want to delete the item(s)?</p>
                    <div className="modal-action justify-center">
                        <button className="btn btn-primary" onClick={handleDeleteReq}>
                            {' '}
                            Delete{' '}
                        </button>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* Bulk delete btn */}
            {selectedLinks.length >= 1 ? (
                <div className="fab">
                    <button
                        className="btn btn-lg btn-circle btn-primary"
                        onClick={() => {
                            setDeleteReq({ type: 'bulk', ids: selectedLinks });
                            handleDeleteModal();
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <div></div>
            )}

            {/* Link details modal */}
            <dialog ref={detailsModal} className="modal">
                <div className="modal-box">
                    {linkDetails ? (
                        <div className="list bg-base-100 rounded-box shadow-md">
                            <div className="list-row">
                                <div className="text-4xl font-thin opacity-30 tabular-nums">
                                    {' '}
                                    {linkDetails.id}{' '}
                                </div>
                                <div className="list-col-grow">
                                    <a href={linkDetails.originalUrl} className="block">
                                        {linkDetails.originalUrl}
                                    </a>
                                    <a
                                        href={linkDetails.shortUrl}
                                        className="text-xs uppercase font-semibold opacity-60 block"
                                    >
                                        {' '}
                                        {linkDetails.shortUrl}{' '}
                                    </a>
                                </div>
                                <button
                                    className="btn btn-square btn-ghost"
                                    onClick={() => {
                                        setDeleteReq({ type: 'single', id: linkDetails.id });
                                        handleDeleteModal();
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex justify-between text-xs uppercase font-semibold opacity-60 p-4">
                                <p> Clicks: {linkDetails.clicks} </p>
                                <DateDisplay isoDate={linkDetails.createdAt} />
                            </div>
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
                            <span> Can't get link details </span>
                        </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <h2 className="text-center font-bold text-4xl text-primary mb-5"> Links Management </h2>

            {/* Links table */}
            {loading ? (
                <TableSkeleton rows={5} />
            ) : (
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={handleSelectAllLinks}
                                    />
                                </label>
                            </th>
                            <th> ID </th>
                            <th> Original Link </th>
                            <th> Short Link </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.map((link) => (
                            <tr key={link.id}>
                                <th>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className="checkbox link-checkbox"
                                            id={link.id}
                                            onChange={handleSelectedLinks}
                                        />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold"> {link.id} </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {' '}
                                    <a href={link.originalUrl}> {link.originalUrl} </a>{' '}
                                </td>
                                <td>
                                    {' '}
                                    <a href={link.shortUrl}> {link.shortUrl} </a>{' '}
                                </td>
                                <th>
                                    <button
                                        className="btn btn-ghost btn-xs"
                                        id={link.id}
                                        onClick={() => detailsHandler(link.id)}
                                    >
                                        details
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th></th>
                            <th> ID </th>
                            <th> Original Link </th>
                            <th> Short Link </th>
                            <th> Actions </th>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}

export default LinkPanel;
