import API from './api';

export async function generatePersistentQr(content) {
    const res = await API.post('/api/v1/qrcode', {
        content,
    });

    return res.data;
}

export async function generatePreviewQr(content) {
    const res = await API.post('/api/v1/qrcode/preview', {
        content,
    });

    return res.data;
}

export async function getQRCode(name) {
    const res = await API.get(`/api/v1/qrcode/${name}`);

    return res.data;
}

export async function getQRCodes() {
    const res = await API.get('/api/v1/qrcode');

    return res.data;
}

export async function deleteQr(id) {
    const res = await API.delete(`/api/v1/qrcode/${id}`);

    return res.data;
}

export async function deleteMultipleQrs(ids) {
    const numericIDs = ids.map((id) => Number(id));
    const res = await API.delete('/api/v1/qrcode/bulk-delete', { data: { ids: numericIDs } });

    return res.data;
}
