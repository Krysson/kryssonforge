// /src/app/tasks/TableView.jsx
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

const TableView = ({ tasks }) => {
  return (
    <Droppable droppableId='table-view'>
      {provided => (
        <Table
          {...provided.droppableProps}
          ref={provided.innerRef}>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[50px]'></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className='text-right'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}>
                {provided => (
                  <TableRow
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <TableCell>
                      <input type='checkbox' />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className='font-medium'>{task.title}</p>
                        <Badge
                          variant='outline'
                          className='mr-1 text-xs'>
                          {task.category}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.status === 'Todo' ? 'secondary' : 'primary'}>
                        {task.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={task.priority === 'High' ? 'destructive' : 'outline'}>
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button
                        variant='ghost'
                        size='icon'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
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
