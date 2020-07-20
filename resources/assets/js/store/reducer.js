const initialState = {
    user_data: '',
    show_modal: false,
    product_id: '',
    cart_count: 0
}

const reducer = (state = initialState, action) => {
    
    if (action.type === 'USER') {
        return {
            user_data: action.value
        }
    }

    if (action.type === 'MODAL_CONTROL') {
        return {
            ...state, 
            show_modal: action.value
        }
    }

    if (action.type === 'QUICKVIEW_CONTROL') {
        return {
            ...state,
            product_id: action.value,
            show_modal: true
        }
    }

    if (action.type === 'CART_COUNT') {
        return {
            cart_count: action.value
        }
    }

    return state
}

export default reducer