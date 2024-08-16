// tasks/page.jsx - showing all tasks in a table
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import {
  MoreHorizontal,
  Plus,
  ListTodo,
  Search,
  Table as TableIcon,
  BarChart2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Link from 'next/link';
import { DragDropContext } from '@hello-pangea/dnd';
import TableView from './TableView';
import KanbanView from './KanbanView';

// const DynamicGanttView = dynamic(() => import('./GanttView'), { ssr: false });

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDragEnd = async result => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    // If the task was dropped in a different column (status change)
    if (source.droppableId !== destination.droppableId) {
      const newTasks = Array.from(tasks);
      const [reorderedTask] = newTasks.splice(source.index, 1);
      reorderedTask.status = destination.droppableId;
      newTasks.splice(destination.index, 0, reorderedTask);

      setTasks(newTasks);

      // Update the task in the database
      try {
        const response = await fetch(`/api/tasks/${draggableId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: destination.droppableId, order: destination.index })
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        // Fetch updated tasks from the server
        const updatedTasksResponse = await fetch('/api/tasks');
        if (updatedTasksResponse.ok) {
          const updatedTasks = await updatedTasksResponse.json();
          setTasks(updatedTasks);
        } else {
          throw new Error('Failed to fetch updated tasks');
        }
      } catch (error) {
        console.error('Error updating task:', error);
        // Revert the state if the API call fails
        setTasks(tasks);
        // Optionally, show an error message to the user
        // setError('Failed to update task. Please try again.');
      }
    } else {
      // If the task was reordered within the same column
      const newTasks = Array.from(tasks);
      const [reorderedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, reorderedTask);

      setTasks(newTasks);

      // Update the order in the database
      try {
        const response = await fetch(`/api/tasks/${draggableId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: destination.index })
        });

        if (!response.ok) {
          throw new Error('Failed to update task order');
        }
      } catch (error) {
        console.error('Error updating task order:', error);
        // Revert the state if the API call fails
        setTasks(tasks);
      }
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='container mx-auto p-4 pl-10 max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Welcome back!</h1>
        <Link href='/tasks/add'>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Add Task
          </Button>
        </Link>
      </div>
      <p className='text-gray-500 mb-6'>Here&rsquo;s a list of your tasks for this month!</p>

      <div className='flex justify-between items-center mb-4'>
        <Input
          type='text'
          placeholder='Search tasks...'
          className='max-w-sm'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className='flex space-x-2'>
          <Button
            variant={view === 'table' ? 'default' : 'outline'}
            onClick={() => setView('table')}>
            <TableIcon className='mr-2 h-4 w-4' /> Table
          </Button>
          <Button
            variant={view === 'kanban' ? 'default' : 'outline'}
            onClick={() => setView('kanban')}>
            <ListTodo className='mr-2 h-4 w-4' /> Kanban
          </Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        {view === 'table' && <TableView tasks={filteredTasks} />}
        {view === 'kanban' && <KanbanView tasks={filteredTasks} />}
      </DragDropContext>
    </div>
  );
};

export default TasksPage;
