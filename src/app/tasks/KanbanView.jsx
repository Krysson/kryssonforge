// arc/app/tasks/KanbanView.jsx
import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const KanbanColumn = ({ title, tasks, droppableId }) => (
  <div className='w-80 bg-gray-100 rounded-lg p-4 shadow-md'>
    <h3 className='font-bold text-lg mb-4 text-gray-700'>{title}</h3>
    <Droppable droppableId={droppableId}>
      {provided => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className='min-h-[500px]'>
          {tasks.map((task, index) => (
            <Draggable
              key={task.id}
              draggableId={task.id}
              index={index}>
              {provided => (
                <Card
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className='mb-3 bg-white hover:shadow-lg transition-shadow duration-200'>
                  <CardHeader className='pb-2'>
                    <h4 className='font-semibold text-gray-800'>{task.title}</h4>
                  </CardHeader>
                  <CardContent>
                    <div className='flex justify-between items-center'>
                      <Badge
                        variant='outline'
                        className='mr-1 text-xs'>
                        {task.category}
                      </Badge>
                      <Badge
                        variant={
                          task.priority === 'High'
                            ? 'destructive'
                            : task.priority === 'Medium'
                            ? 'warning'
                            : 'default'
                        }>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className='text-sm text-gray-600 mt-2'>{task.body}</p>
                    <div className='text-xs text-gray-500 mt-2'>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

const KanbanView = ({ tasks }) => {
  const columns = ['Todo', 'In Progress', 'Done'];

  return (
    <div className='flex space-x-6 overflow-x-auto pb-4'>
      {columns.map(column => (
        <KanbanColumn
          key={column}
          title={column}
          tasks={tasks.filter(task => task.status === column)}
          droppableId={column}
        />
      ))}
    </div>
  );
};

export default KanbanView;
