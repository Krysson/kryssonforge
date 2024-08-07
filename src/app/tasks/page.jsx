import React from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Plus, ListTodo } from 'lucide-react'

// Import JSON data
import tasksData from '/JSON/tasks.json'
import usersData from '/JSON/users.json'
import projectsData from '/JSON/projects.json'

const TaskColumn = ({ title, tasks, count, users, projects }) => (
  <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-0.5rem)] p-2'>
    <Card className='bg-gray-50'>
      <CardHeader className='flex flex-col items-center justify-center space-y-1 pb-2'>
        <h3 className='text-2xl font-bold text-center'>{title}</h3>
        <Badge variant='secondary'>{count}</Badge>
      </CardHeader>
      <CardContent>
        <button className='w-full text-sm text-gray-500 flex items-center justify-center py-2 hover:bg-gray-100 rounded-md'>
          <Plus className='w-4 h-4 mr-2' /> Add task
        </button>
        {tasks.map(task => {
          const project = projects.find(p => p.taskIds.includes(task.id))
          const assignedUsers = users.filter(user => task.userIds.includes(user.id))
          return (
            <Card
              key={task.id}
              className='mt-2 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
              <CardContent className='p-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='text-sm font-semibold'>{task.title}</h4>
                    <p className='text-xs text-gray-500 mt-1'>{task.body.substring(0, 60)}...</p>
                  </div>
                  <button className='text-gray-400 hover:text-gray-600'>
                    <MoreHorizontal className='w-4 h-4' />
                  </button>
                </div>
                <div className='flex items-center mt-4'>
                  <Badge
                    variant='outline'
                    className='mr-1 text-xs'>
                    {task.category}
                  </Badge>
                  <Badge
                    variant='outline'
                    className='mr-1 text-xs'>
                    {task.priority}
                  </Badge>
                  {project && (
                    <Badge
                      variant='outline'
                      className='mr-1 text-xs'>
                      {project.name}
                    </Badge>
                  )}
                </div>
                <div className='flex justify-between items-center mt-4'>
                  <div className='flex -space-x-2'>
                    {assignedUsers.map(user => (
                      <Avatar
                        key={user.id}
                        className='w-6 h-6 border-2 border-white'>
                        <AvatarFallback>
                          {user.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <div className='flex items-center text-xs text-gray-500'>
                    <ListTodo className='w-4 h-4 mr-1' />
                    0/1
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </CardContent>
    </Card>
  </div>
)

const TasksPage = () => {
  const statusColumns = [
    { title: 'Not Started', statuses: ['To Do', 'Not Started'] },
    { title: 'In Progress', statuses: ['In Progress'] },
    { title: 'Stuck', statuses: ['Stuck', 'Waiting'] },
    { title: 'Done', statuses: ['Completed', 'Done'] }
  ]

  const users = usersData.users
  const projects = projectsData.projects
  const tasks = tasksData.tasks

  return (
    <div className='container mx-auto p-4 pl-10 max-w-full'>
      <h1 className='text-2xl font-bold mb-6'>Tasks</h1>
      <div className='flex flex-wrap -mx-2'>
        {statusColumns.map(column => {
          const columnTasks = tasks.filter(task => column.statuses.includes(task.status))
          return (
            <TaskColumn
              key={column.title}
              title={column.title}
              tasks={columnTasks}
              count={columnTasks.length}
              users={users}
              projects={projects}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TasksPage
