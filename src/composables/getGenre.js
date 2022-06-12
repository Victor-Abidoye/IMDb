export function getGenre (id, genres) {
    const newStore = []
    for (let i = 0; i < id.length; i++) {
        const store = genres.find((genre) => {
            return genre.id == id[i]
        })
        newStore.push(store.name)
    }
    return newStore
}