export const UPDATE_TEMPERATURES = 'updateTemperatures'

export default {
    state: {
        currentTemperatures: []
    },

    mutations: {
        [UPDATE_TEMPERATURES](state, payload) {
            state.currentTemperatures = payload.temperatures
        }
    }
}
