const config = {
    base_url: 'https://api.football-data.org/v2',
    token: '475e7135b6ef4429add13634f35e80ba',
    liga_id: '2021',
    get endPoint() {
        return {
            base_url: this.base_url,
            klasemen: `${this.base_url}/competitions/${this.liga_id}/standings/`,
            teamLiga: `${this.base_url}/competitions/${this.liga_id}/teams`,
            team: `${this.base_url}/teams/`,
            upComing: `${this.base_url}/competitions/${this.liga_id}/matches?status=SCHEDULED`,
        }
    }
}

const {
    token,
    endPoint,
} = config

function fetchData(url) {
    return fetch(url, {
        method: "GET",
        headers: {
            'X-Auth-Token': token
        }
    })
}

async function getKlasemen() {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.klasemen)
            return await res.json()
        }
    } catch (error) {
        try {
            const res = await fetchData(endPoint.klasemen)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }

}

async function getTeamLiga() {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.teamLiga)
            return await res.json()
        }
    } catch (error) {
        try {
            const res = await fetchData(endPoint.teamLiga)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }

}

async function getTeam(id) {
    try {
        if ('caches' in window) {
            let res = await caches.match(endPoint.team + '/' + id)
            if (res !== undefined) {
                return await res.json()
            }
            throw 'err'
        }

    } catch (error) {
        try {
            const res = await fetchData(endPoint.team + '/' + id)
            return await res.json()
        } catch (error) {
            console.log(error);
        }
    }
}


async function getMatch() {
        try {
            if ('caches' in window) {
                let res = await caches.match(endPoint.upComing)
                return await res.json()
            }
        } catch (error) {
            try {
                const res = await fetchData(endPoint.upComing)
                return await res.json()
            } catch (error) {
                console.log(error);
            }
        }
}