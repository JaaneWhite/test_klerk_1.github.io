import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from "axios"

// Create a new store instance.
export const store = createStore({
    state () {
        return {
            allowEmpty: false,
            rubricsTree: []
        }
    },
    getters: {
        sumCheckedCounts (state) {
            return state.rubricsTree.reduce((sum, item) => {
                return sum + countTreeChecked(item)
            }, 0)
        }
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setTree(state, tree) {
            state.rubricsTree = tree
        },
    },
    actions: {
        async getTree({state, commit, dispatch}) {
            const url = `https://www.klerk.ru/yindex.php/v3/event/rubrics${state.allowEmpty ? '?allowEmpty=1' : ''}`
            try {
                const response = await axios.get(url)
                let tree = response.data
                tree.forEach(branch => {
                    calcCountsSums(branch);
                    setTreeCheckedAndCollapses(branch);
                })
                commit('setTree', tree)
            } catch (e) {
                console.log(e)
            }
        },
    },

})

function calcCountsSums(branch) {
    let count = branch.count
    if (branch.children) {
        branch.totalCount =  branch.children.reduce((sum, item) => {
            return sum + calcCountsSums(item)
        }, count)
    } else {
        branch.totalCount = count
    }
    branch.checked = false
    return count
}
function setTreeCheckedAndCollapses(branch) {
    if (branch.children  && branch.children.length > 0) {
        branch.children.forEach(item => {
            setTreeCheckedAndCollapses(item)
        })
        branch.collapsed = false
        branch.canCollapse = true
    }

    branch.checked = false
    return
}
function countTreeChecked(branch) {
    let res = branch.checked ? branch.count : 0
    if (branch.children) {
        res =  branch.children.reduce((sum, item) => {
            return sum + (item.checked ? countTreeChecked(item) : 0)
        }, res)
    }
    return res
}
