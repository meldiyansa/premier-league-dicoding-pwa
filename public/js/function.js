const route = function (id = null) {
    parseUrl(id).then(url => {
        switch (url.page) {
            case 'team':
                displayTeam(url.query.id)
                break
            case 'pertandingan':
                displayMatch()
                break
            case 'favorit':
                displayFavTeam()
                break
            case 'teamliga':
                displayLigaTeam()
                break
            default:
                loadPage(url.page).then(page => {
                    if (page == 'home') 
                    displayKlasemen()
                })
                break
        }
    })
}

document.addEventListener('DOMContentLoaded', async function () {
    loadNav()
    route()
})


async function displayKlasemen() {
    let rowTable = ''
    const data = await getKlasemen()
    await data.standings[0].table.forEach(standing => {
        rowTable += `<tr>
                <td>${standing.position}</td>
                    <td class="valign-wrapper">
                    <img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" class="show-on-medium-and-up show-on-medium-and-down" alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px"> ${standing.team.name}
                    </td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                </tr>`
    })
    document.querySelector('tbody').innerHTML = rowTable

    document.getElementById('preloaderklasemen').style.display = 'none';

}


async function displayTeam(id) {
    const data = await getTeam(id)

    let squadLeft = '',
        squadRight = '',
        league = '',
        match = ''

    data.activeCompetitions.forEach(league => {
        league += `<a href="">${league.name}</a> ,`
    })

    loadPage('team').then(function () {
        initCollapsable()

        let dataFav = {
            id: data.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
            website: data.website,
            founded: data.founded,
            clubColors: data.clubColors,
            vanue: data.vanue,
            crestUrl: data.crestUrl,
            league,
            squadLeft,
            squadRight,
            match,
        }

        document.querySelector('.team-name h3').innerHTML = data.name

        document.querySelector('#information').innerHTML = `
            <li class="collection-item">Address : ${data.address}</li>
            <li class="collection-item">Phone : ${data.phone}</li>
            <li class="collection-item">Website : <a href="${data.website}" target="_blank">${data.website}</a></li>
            <li class="collection-item">Email : ${data.email}</li>
            <li class="collection-item">Founded : ${data.founded}</li>
            <li class="collection-item">Club Colors : ${data.clubColors}</li>
            <li class="collection-item">Stadium : ${data.venue}</li>
        `
        crestImage = document.querySelector('.team-wraper-top img')
        crestImage.setAttribute('src', data.crestUrl.replace(/^http:\/\//i, 'https://'))
        crestImage.setAttribute('alt', data.name)

        checkFavId(data.id)
        const teamFavButton = document.querySelector('.fav-btn')
        teamFavButton.addEventListener('click', click => {
            click.preventDefault()
            checkFav(data.id, true)
        })

        function checkFavId(id) {
            isFav(id).then(fav => {
                if (fav) {
                    teamFavButton.innerHTML = 'Hapus dari favorite'
                } else {
                    teamFavButton.innerHTML = 'Tambah ke favorite'
                }
            })
        }


        function checkFav(id, event = false) {
            isFav(id).then(fav => {
                if (fav) {
                    if (event) {
                        M.toast({html: data.name+'Dihapus dari favorite'})
                        deleteTeamFav(id);
                        teamFavButton.innerHTML = 'Tambah ke favorite'
                    }
                } else {
                    if (event) {
                        M.toast({html: data.name + 'Ditambahkan ke favorite'})
                        addTeamFav(dataFav);
                        teamFavButton.innerHTML = 'Hapus dari favorite'
                    }
                }
            })
        }
    })
}


async function displayMatch() {

    const data = await getMatch()
    let match = ''

    loadPage('pertandingan').then(function () {
        
        data.matches.forEach(tanding => {
            match += `
            <div class="col s12 m6 l6">
            <div class="card tinggi horizontal d-flex f-width-100 align-item-center">
                <div class="card-content">
                <div class="row">
                <div class="col s12 m12 l12 justify-center">
                    <p class=" text-darken-3">${new Date(tanding.utcDate).toLocaleDateString('en-ID',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
            <div class="row mb-0">
                <div class="col s5 m5 l5">
                    <h6>Home</h6> 
                    <h6 style="color:#2D8A92;">${tanding.homeTeam.name}</h6> 
                </div>
                <div class="col s2 m2 l2">
                    <h5>VS</h5>
                </div>
                <div class="col s5 m5 l5">
                    <h6>Away</h6> 
                    <h6 style="color:#2D8A92;">${tanding.awayTeam.name}</h6>   
                </div>
            </div>
                </div>
            </div>
        </div>
            `
        })

        document.querySelector('#match').innerHTML = match

    })
}


async function displayLigaTeam() {

    const data = await getTeamLiga()
    let ligateam = ''

    loadPage('teamliga').then(function () {
        
        data.teams.forEach(teams => {
            ligateam += `
            <div class="col s12 l3 p5">
                <div class="card">
                    <div class="card-image p-2 imgh center">
                        <img src="${teams.crestUrl}">
                    </div>
                    <div class="card-content line-3">
                        <p >${teams.name}</p>
                    </div>
                    <div class="card-action align="center">
                    <a style="color:#2D8A92;" id="lihat-detail" href="#team?id=${teams.id}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lihat Detail</a>   
                    </div>
                </div>
            </div>
            `
        })

        document.querySelector('#teams').innerHTML = ligateam

        document.querySelectorAll('#lihat-detail').forEach(link => {
            link.addEventListener('click', click => {
                route(click.target.getAttribute('href'))
            })
        })
    })
}


function displayFavTeam() {
    let data = ''

    getAllTeamFav().then(favs => {

        if(favs == null || favs ==""){
            M.toast({html: 'Team favorit masih kosong'})
        }
        else{
            for (const f of favs) {
                data += `
                        <li class="collection-item left-align" id="unfav-id-${f.id}">
                        <div class="d-flex space-betwen align-item-center">
                        <p class="left-align"><img src="${f.crestUrl.replace(/^http:\/\//i, 'https://')}" class="show-on-medium-and-up show-on-medium-and-down" alt="logo club" style="float:left;width:22px;height:22px;margin-right:20px"> ${f.name}</p> 
                        <a href="#unfav-me" class="waves-effect waves-block waves-light btn unfav" data-id="${f.id}">Hapus dari favorit</a>
                        </div>
                            </li>
                                `
            }
        }
    })

    loadPage('favorit').then(function () {
        const ulTeamFav = document.querySelector('#favorite')
        ulTeamFav.innerHTML = data

        document.querySelectorAll('.unfav').forEach( btn => {
            btn.addEventListener('click',click => {
                click.preventDefault()
                deleteTeamFav(parseInt(click.target.getAttribute('data-id')))
                M.toast({html: 'Berhasil di hapus dari favorite'})
                ulTeamFav.querySelector('#unfav-id-'+click.target.getAttribute('data-id')).style.display = 'none'
            })
        })

    })
}