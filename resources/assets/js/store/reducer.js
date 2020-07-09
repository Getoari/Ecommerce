const initialState = {
    user: ''
}

const reducer = (state = initialState, action) => {
    if (action.type === 'USER') {
        return {
            user: action.value
        }
    }

    return state
}

export default reducer