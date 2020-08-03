const initialState = {
    user_data: '',
    show_modal: false,
    show_login: false,
    product_id: '',
    cart_count: 0,
    wishlist_count: 0,
    toast_show: false,
    toast_message: ''
}

const reducer = (state = initialState, action) => {
    
    switch ( action.type ) {
        case 'USER':
            return {
                user_data: action.value
            }
        case 'MODAL_CONTROL':
            return {
                ...state, 
                show_modal: action.value
            }
        case 'LOGIN_CONTROL':
            return {
                ...state, 
                show_login: action.value
            }
        case 'QUICKVIEW_CONTROL':
            return {
                ...state,
                product_id: action.value,
                show_modal: true
            }
        case 'CART_COUNT':
            return {
                ...state,
                cart_count: action.value
            }
        case 'WISHLIST_COUNT':
            return {
                ...state,
                wishlist_count: action.value
            }
        case 'SHOW_TOAST':
            return {
                ...state,
                toast_show: true,
                toast_message: action.value
            }
        case 'HIDE_TOAST':
            return {
                ...state,
                toast_show: false
            }
    }

    return state
}

export default reducer