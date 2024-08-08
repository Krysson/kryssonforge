// project page component

'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search, ListTodo, MoreHorizontal, Plus } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

// Load JSON data using require
const projectsData = require('/JSON/projects.json')
const usersData = require('/JSON/users.json')

// ProjectCard View

const ProjectCard = ({ project }) => {
  const isStuckOrWaiting = project.status === 'Stuck' || project.status === 'Waiting'

  return (
    <Card className='bg-gray-50 rounded-lg p-6 mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
      <div className=' '>
        <h2 className='text-2xl font-bold mb-2'>{project.name}</h2>
        <p className='text-black mb-1'>Project Number: {project.number}</p>
        <p className='text-black mb-1'>Location: {project.location}</p>
        <p className='text-black mb-1'>Project Manager: {project.projectManager}</p>
        <p className='text-black mb-1'>General Contractor: {project.generalContractor}</p>
        <p className='text-black mb-1'>Contract Price: {project.contractPrice}</p>
        <p className='text-black mb-1'>
          Project Status:{' '}
          <Badge
            variant={isStuckOrWaiting ? 'destructive' : 'outline'}
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
  )
}

// ProjectColumn View

const ProjectColumn = ({ title, projects, count, users }) => (
  <div className='w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-0.5rem)] p-2'>
    <Card className='bg-gray-50'>
      <CardHeader className='flex flex-col items-center justify-center space-y-1 pb-2'>
        <h3 className='text-2xl font-bold text-center'>{title}</h3>
        <Badge variant='secondary'>{count}</Badge>
      </CardHeader>
      <CardContent>
        <button className='w-full text-sm text-gray-500 flex items-center justify-center py-2 hover:bg-gray-100 rounded-md'>
          <Plus className='w-4 h-4 mr-2' /> Add project
        </button>
        {projects.map(project => {
          const assignedUsers = users.filter(user => project.userIds.includes(user.id))
          const isStuckOrWaiting = project.status === 'Stuck' || project.status === 'Waiting'
          return (
            <Card
              key={project.id}
              className='mt-2 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer'>
              <CardContent className='p-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h4 className='text-sm font-semibold'>{project.name}</h4>
                    <p className='text-xs text-gray-500 mt-1'>
                      {project.description.substring(0, 60)}...
                    </p>
                  </div>
                  <button className='text-gray-400 hover:text-gray-600'>
                    <MoreHorizontal className='w-4 h-4' />
                  </button>
                </div>
                <div className='flex items-center mt-4'>
                  <Badge
                    variant={isStuckOrWaiting ? 'destructive' : 'outline'}
                    className='mr-1 text-xs'>
                    {project.status}
                  </Badge>
                </div>
                <div className='flex justify-between items-center mt-4'>
                  <div className='flex -space-x-2'>
                    {assignedUsers.map(user => (
                      <Avatar
                        key={user.id}
                        className='w-8 h-8 border-2 border-gray-600 bg-slate-500'>
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
                    {project.completionPercentage}%
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

const ProjectsPage = () => {
  const [isStatusView, setIsStatusView] = useState(false)
  const projects = projectsData && projectsData.projects ? projectsData.projects : []
  const users = usersData && usersData.users ? usersData.users : []

  const statusColumns = [
    { title: 'Not Started', statuses: ['Planning', 'Not Started', 'Pre-Construction'] },
    { title: 'In Progress', statuses: ['In Progress'] },
    { title: 'Waiting', statuses: ['Stuck', 'Waiting'] },
    { title: 'Done', statuses: ['Completed', 'Done'] }
  ]

  return (
    <div className='container mx-auto p-4 pl-10 max-w-full'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center space-x-2'>
            <p>Card View</p>
            <Switch
              id='view-mode'
              checked={isStatusView}
              onCheckedChange={setIsStatusView}
            />
            <Label htmlFor='view-mode'>Status View</Label>
          </div>
          <div className='relative'>
            <Input
              type='text'
              placeholder='Search projects...'
              className='pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
          </div>
        </div>
      </div>
      {isStatusView ? (
        <div className='flex flex-wrap -mx-2'>
          {statusColumns.map(column => {
            const columnProjects = projects.filter(project =>
              column.statuses.includes(project.status)
            )
            return (
              <ProjectColumn
                key={column.title}
                title={column.title}
                projects={columnProjects}
                count={columnProjects.length}
                users={users}
              />
            )
          })}
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectsPage
