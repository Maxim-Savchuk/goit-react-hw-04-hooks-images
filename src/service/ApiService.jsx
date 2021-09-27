export const fetchImages = async (imageName, page) => {
    const API_KEY = '22714913-606cac6e21aef876ccb1111b2';
    const BASE_URL = 'https://pixabay.com/api/';
    const url = `${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    const result = await fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(new Error('Error'));
    })

    return result;
}
