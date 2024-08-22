// src/app/projects/TableView.jsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

const TableView = ({ projects }) => {
  return (
    <Droppable droppableId='table-view'>
      {provided => (
        <Table
          {...provided.droppableProps}
          ref={provided.innerRef}>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>General Contractor</TableHead>
              <TableHead className='text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <Draggable
                key={project.id}
                draggableId={project.id}
                index={index}>
                {provided => (
                  <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <TableCell>
                      <input type='checkbox' />
                    </TableCell>
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
                    <TableCell>{project.generalContractor}</TableCell>
                    <TableCell className='text-right '>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TableBody>
        </Table>
      )}
    </Droppable>
  );
};

export default TableView;
