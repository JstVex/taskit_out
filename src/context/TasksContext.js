import { createContext, useReducer } from "react";

export const TasksContext = createContext();

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return {
                tasks: [...state.tasks, action.payload]
            }
        case 'EDIT_TASK':
            return {
                tasks: []
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((me) => me._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TasksContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    });

    return (
        <TasksContext.Provider value={{ ...state, dispatch }} >
            {children}
        </TasksContext.Provider>
    )
}
