import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpenEdit: false,
    isOpenDelete: false,
    exercise: null
    //componentName: null,
    //modalChildPosition: null,
    //childrenProps: {},
  };

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openEditModal: (state, action) => {
            state.isOpenEdit = true;
            state.exercise = action.payload
            //state.componentName = action.payload.name;
            //state.modalChildPosition = action.payload.position || 'center';
            //state.childrenProps = action.payload.childrenProps;
        },
        openDeleteModal: (state, action) => {
            state.isOpenDelete = true;
            //state.componentName = action.payload.name;
            //state.modalChildPosition = action.payload.position || 'center';
            //state.childrenProps = action.payload.childrenProps;
        },
        closeModal: (state, action) => {
            state.isOpenEdit = false;
            state.isOpenDelete = false
            state.exercise = null;
            //state.componentName = null;
            //state.modalChildPosition = 'center';
            //state.childrenProps = {};
        },
    },
});

export const { openEditModal, openDeleteModal ,closeModal } = modalSlice.actions;

export default modalSlice.reducer

//export default exerciseReducer