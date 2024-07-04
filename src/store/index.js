import { createStore } from 'vuex'
import axios from 'axios'

import { BASE_URL } from "@/api/api";
import { filteredMovieList } from "@/utils/filteredMovieList";
import { sortedListById } from '@/utils/sortedListById';

export default createStore({
  state: {
    fileList: [],
    moviesSession: [],
    bookTicket: {},
    movieSessionById: {},
    filmBookedPlace: {}
  },

  getters: {
    getFilmList: state => sortedListById(state.fileList),
    getMoviesSession: state => state.moviesSession,
    getBookTicket: state => state.bookTicket,
    getMovieSessionById: state => state.movieSessionById,
    getFilmBookedPlace: state => state.filmBookedPlace
  },

  mutations: {
    setFileList(state, response) {
      state.fileList = response
    },

    setMoviesSession(state, response) {
      state.moviesSession = response
    },

    setBookTicket(state, response) {
      state.bookTicket = response
    },

    setMovieSessionById(state, response) {
      state.movieSessionById = response
    },

    setFilmBookedPlace(state, response) {
      state.filmBookedPlace = response
    }
  },

  actions: {

    loadFilmList({ commit }, payload) {
      return axios.get(BASE_URL+`/movies?${filteredMovieList(payload)}`)
        .then((response) => {
          commit('setFileList', response.data.data)
        })
    },

    loadMoviesSessions({ commit }) {
      return axios.get(BASE_URL+`/movieShows`)
        .then((response) => {
          commit('setMoviesSession', response.data.data)
        })
    },

    loadMoviesSessionById({ commit }, payload) {
        const { id } = payload

        return axios.get(BASE_URL+`/movieShows?${id}`)
          .then((response) => {
            commit('setMovieSessionById', response.data.data)
          })
    },

    loadBookTicket({ commit }, payload) {
      console.log(payload)
      const { id, daytime, showdate } = payload

      return axios.get(BASE_URL + `/showPlaces?movie_id=${id}&daytime=${daytime}&showdate=${showdate}`)
        .then((response) => {
          commit('setBookTicket', response.data.data)
        })
    },

    loadBookPlace({ commit }, payload) {
      return axios.post(BASE_URL + '/bookPlace', payload)
        .then((response) => {
          commit('setFilmBookedPlace', response.data.data)
        })
    }
  },

  modules: {
  }
})
