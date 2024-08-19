//  src/app/projects/page.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Plus, ListTodo, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        } else {
          console.error('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const ProjectCard = ({ project }) => (
    <Card className='bg-gray-50 rounded-lg p-6 mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>{project.name}</h2>
        <p className='text-black mb-1'>Project Number: {project.number}</p>
        <p className='text-black mb-1'>Location: {project.location}</p>
        <p className='text-black mb-1'>Project Manager: {project.projectManager}</p>
        <p className='text-black mb-1'>General Contractor: {project.generalContractor}</p>
        <p className='text-black mb-1'>Contract Price: {project.contractPrice}</p>
        <p className='text-black mb-1'>
          Project Status:{' '}
          <Badge
            variant={
              project.status === 'Stuck' || project.status === 'Waiting' ? 'destructive' : 'outline'
            }
            className='mr-1 text-xs'>
            {project.status}
          </Badge>
        </p>
        <div className='mt-2'>
          <div className='text-black mb-1'>Completion: {project.completionPercentage}%</div>
          <div className='w-full bg-gray-400 rounded-full h-2.5'>
            <div
              className='bg-green-500 h-2.5 rounded-full'
              style={{ width: `${project.completionPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className='container mx-auto p-4 pl-10 max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <Label htmlFor='view-mode'>Table View</Label>
            <Switch
              id='view-mode'
              checked={isCardView}
              onCheckedChange={setIsCardView}
            />
            <Label htmlFor='view-mode'>Card View</Label>
          </div>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Search projects...'
              className='pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          </div>
          <Link href='/projects/add'>
            <Button>
              <Plus className='mr-2 h-4 w-4' /> Add Project
            </Button>
          </Link>
        </div>
      </div>

      {!isCardView ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Project Manager</TableHead>
              <TableHead className='text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map(project => (
              <TableRow key={project.id}>
                <TableCell className='font-medium'>{project.name}</TableCell>
                <TableCell>{project.number}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === 'Stuck' || project.status === 'Waiting'
                        ? 'destructive'
                        : 'outline'
                    }>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.completionPercentage}%</TableCell>
                <TableCell>{project.projectManager}</TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='ghost'
                    size='icon'>
                    <MoreHorizontal className='h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
