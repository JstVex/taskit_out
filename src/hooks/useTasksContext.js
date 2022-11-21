import { TasksContext } from '../context/TasksContext';
import { useContext } from 'react';

export const useTasksContext = () => {
    const context = useContext(TasksContext);

    if (!context) {
        throw Error('useTasksContext must be used inside the TasksContextProvider:(');
    }

    return context
}