import API from './api';

export async function shortenLink(url) {
    const res = await API.post('/api/v1/link', {
        url,
    });

    return res.data;
}

export async function getLinks() {
    const res = await API.get('/api/v1/link');

    return res.data;
}

export async function deleteLink(id) {
    const res = await API.delete(`/api/v1/link/${id}`);

    return res.data;
}

export async function deleteMultipleLinks(ids) {
    const numericIDs = ids.map((id) => Number(id));
    const res = await API.delete('/api/v1/link/bulk-delete', { data: { ids: numericIDs } });

    return res.data;
}
