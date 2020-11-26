let dbPromise = idb.open("Football", 3, function (upgradeDB) {
    if (!upgradeDB.objectStoreNames.contains('teamFavorite')) {
        let teamStore = upgradeDB.createObjectStore('teamFavorite', {
            keyPath: 'id',
            autoIncrement: false
        })
        teamStore.createIndex('id', 'id', {
            unique: true
        })
    }
})


function addTeamFav(data) {
    dbPromise.then(database => {
        let tx = database.transaction('teamFavorite', 'readwrite')
        tx.objectStore('teamFavorite').add(data)
        return tx.complete
    })
}


function getAllTeamFav() {
    return dbPromise.then(async database => {
        let tx = await database.transaction('teamFavorite', 'readonly')
        let store = await tx.objectStore('teamFavorite')
        return await store.getAll()
    })
}


function isFav(id) {
    return dbPromise.then(async database => {
        let tx = await database.transaction('teamFavorite', 'readonly')
        let data = await tx.objectStore('teamFavorite').get(id)
        return data == undefined ? false : true
    })

}


function deleteTeamFav(id) {
    dbPromise.then(database => {
        let tx = database.transaction('teamFavorite','readwrite')
        tx.objectStore('teamFavorite').delete(id)
        return tx.complete
    })
}