export default {
    namespaced: true,

    state:{
        criminal: null,
        crime: null,
        associations: null,
        criminal_existed: false
    },
    mutations:{
        setCriminal(state,criminal){
            state.criminal = criminal
        },
        setCrime(state,crime){
            state.crime = crime
        },
        setAssociations(state,associations){
            state.associations = associations
        },
        setCriminalExisted(state,status){
            state.criminal_existed = status
        }
    },

    getters:{
        getCriminal(state){
            return state.criminal
        },
        getCrime(state){
            return state.crime
        },
        getAssociations(state){
            return state.associations
        },
        getCriminalExisted(state){
            return state.criminal_existed
        }
    },
    actions:{
        setCriminal({commit},data){
            console.log("setting criminal")
            commit('setCriminal',data)

        },
        setCrime({commit},data){
            commit('setCrime',data)
        },
        setAssociation({commit},data){
            commit('setAssociations',data)
        },

        setCriminalExisted({commit}){
            commit('setCriminalExisted',true)
        },
        pushCrime(){
            //push criminal to server
            

        }
    },

}