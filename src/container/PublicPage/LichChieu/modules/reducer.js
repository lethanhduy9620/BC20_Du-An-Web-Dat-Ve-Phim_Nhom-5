import * as ActionType from './constants';

let initialState = {
    loading: false,
    data: null,
    error: null,
};

const lichChieuPhimReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.REQUEST_LICH_CHIEU_PHIM:
            state.loading = true;
            state.data = null;
            state.error = null;
            return { ...state };
        case ActionType.REQUEST_LICH_CHIEU_PHIM_SUCCESS:
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            return { ...state };
        case ActionType.REQUEST_LICH_CHIEU_PHIM_FAIL:
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            return { ...state };
        default:
            return { ...state };
    };
};

export default lichChieuPhimReducer;


