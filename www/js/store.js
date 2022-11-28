var createStore = Framework7.createStore;
const store = createStore({
  state: {
    photos: [
      // {
      //   url: "test",
      //   location: {
      //     lat: 50.222,
      //     lng: -113.111
      //   }
      // },
    ]
  },
  getters: {
    photos({ state }) {
      return state.photos;
    }
  },
  actions: {
    addPhoto({ state }, photo) {
      state.photos = [...state.photos, photo];
    },
  },
})

