export default{
    namespaced:true,
    state:{
        hotspots: []
    },
    mutations:{
        setHotspots(state,hotspots){
            state.hotspots=hotspots
        }
    },
    getters:{
        getHotspots(state){
            return state.hotspots
        }
    },
    actions:{
        setHotspots({commit},hotspots){
            commit('setHotspots',hotspots)
        }
    }
}