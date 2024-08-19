//  src/app/projects/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { Plus, ListTodo, Search, Table as TableIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DragDropContext } from '@hello-pangea/dnd';
import TableView from './TableView';
import KanbanView from './KanbanView';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { set } from 'mongoose';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [view, setView] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched projects:', data); // Add this line
          setProjects(data);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDragEnd = async result => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const newProjects = Array.from(projects);
      const [movedProject] = newProjects.splice(source.index, 1);
      movedProject.status = destination.droppableId;
      newProjects.splice(destination.index, 0, movedProject);

      setProjects(newProjects);

      // Update the project in the database
      try {
        const response = await fetch(`/api/projects/${draggableId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: destination.droppableId })
        });

        if (!response.ok) {
          throw new Error(`Failed to update project: ${response.status} ${response.statusText}`);
        }

        const updatedProject = await response.json();
        console.log('Project updated successfully:', updatedProject);
      } catch (error) {
        console.error('Error updating project:', error);
        // Revert the state if the API call fails
        setProjects(projects);
      }
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className='container mx-auto p-4 pl-10 max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <Link href='/projects/add'>
          <Button>
            <Plus className='mr-2 h-4 w-4' /> Add Project
          </Button>
        </Link>
      </div>

      <div className='flex justify-between items-center mb-4'>
        <Input
          type='text'
          placeholder='Search projects...'
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
        {view === 'table' && <TableView projects={filteredProjects} />}
        {view === 'kanban' && <KanbanView projects={filteredProjects} />}
      </DragDropContext>
    </div>
  );
};

export default ProjectsPage;
