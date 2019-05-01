export default (initialState, handlers) => {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        console.log("Create Reducer action: ", action)
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
  }