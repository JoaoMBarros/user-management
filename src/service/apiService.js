class BaseService {
    constructor(userData) {
        this.userData = userData;
        this.authToken = userData.token;
    }

    async fetch(url, options = {}) {
        const response = await fetch(url, {
           ...options,
            headers: {
                Authorization: `Token ${this.authToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status != 201 && response.status != 200) {
            const responseJson = await response.json();
            const stringError = Object.keys(responseJson).map(key => `${responseJson[key]}`).join('\n');
            alert(stringError)
            return;
        }
        return response.json();
    }
}


const postUserService = async (pessoa) => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userService = new BaseService(userData);

    return await userService.fetch('https://api-manager-test.infog2.com.br.infog2.com.br/a/colaborador/', {
        method: 'POST',
        body: pessoa,
    });
};

const fetchUserService = async (userId) => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userService = new BaseService(userData);
    return await userService.fetch(`https://api-manager-test.infog2.com.br.infog2.com.br/a/colaborador/${userId}/`);
};

const fetchCitiesService = async () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userService = new BaseService(userData);
    return await userService.fetch('https://api-manager-test.infog2.com.br.infog2.com.br/a/cidade/?text=');
};

const fetchNeighborhoodsService = async (cityId) => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const userService = new BaseService(userData);
    return await userService.fetch(`https://api-manager-test.infog2.com.br.infog2.com.br/a/bairro/?cidade_id=${cityId}`);
};

export { postUserService, fetchUserService, fetchNeighborhoodsService, fetchCitiesService };