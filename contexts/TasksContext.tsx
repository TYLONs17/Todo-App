import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  category: string;
  subTasks?: Task[];
  repeat?: boolean;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (id: string, newTitle: string) => void;
  toggleTaskCompletion: (id: string) => void;
  removeTask: (id: string) => void;
  setTaskPriority: (id: string, priority: 'low' | 'medium' | 'high') => void;
  setTaskDueDate: (id: string, dueDate: Date | null) => void;
  setTaskCategory: (id: string, category: string) => void;
  searchTasks: (query: string) => Task[];
}

interface TasksProviderProps {
  children: ReactNode;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, title: newTitle } : task));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const setTaskPriority = (id: string, priority: 'low' | 'medium' | 'high') => {
    setTasks(tasks.map(task => task.id === id ? { ...task, priority } : task));
  };

  const setTaskDueDate = (id: string, dueDate: Date | null) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, dueDate } : task));
  };

  const setTaskCategory = (id: string, category: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, category } : task));
  };

  const searchTasks = (query: string) => {
    return tasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, toggleTaskCompletion, removeTask, setTaskPriority, setTaskDueDate, setTaskCategory, searchTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasksContext must be used within a TasksProvider');
  }
  return context;
};
