import axios from './axios';

export const getMediaById = async (id) => axios.get(`Media/${id}`);

export const getMediaCount = async () => axios.get('Media/count');

export const getAllMedia = async (search = '', searchShows = false, page, size) => {
    let query = '?';

    if (!!search) {
        query += `&Search=${search}`;
    }
    if (!!searchShows) {
        query += `&SearchShows=${searchShows}`;
    }
    if (!!page) {
        query += `&Page=${page}`;
    }
    if (!!size) {
        query += `&Size=${size}`;
    }


    console.log(`Media${query}`);
    
    return axios.get(`Media?${query}`);
} 

