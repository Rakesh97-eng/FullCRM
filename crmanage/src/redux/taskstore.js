import { configureStore } from "@reduxjs/toolkit";
import reducer from './taskslice'

const TaskStore = configureStore({
    reducer:{
        "task":reducer,
       
    }
})

export default TaskStore;