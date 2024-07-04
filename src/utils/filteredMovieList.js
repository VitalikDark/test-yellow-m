export const filteredMovieList = (data) => {
  if (data) {
    console.log('filteredMovieList ', data)
    const { id, name, genres } = data
    let idStr = '', nameStr = '', genresStr = ''

    if (id?.length > 0) {
      idStr = `&movie_id=${id}`
    }
    if (name?.length > 0) {
      nameStr = `&name=${name}`
    }
    if (genres?.length > 0) {
      genresStr = `&genres=${genres}`
    }

    return `${idStr}${nameStr}${genresStr}`.slice(1)
  }
  return ``
}
