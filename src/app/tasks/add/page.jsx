// tasks/add/page.jsx - for adding tasks
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'

const AddTaskPage = () => {
  const router = useRouter()
  const [selectedUsers, setSelectedUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    // Fetch projects and users from your API
    const fetchData = async () => {
      const projectsResponse = await fetch('/api/projects')
      const projectsData = await projectsResponse.json()
      setProjects(projectsData)

      const usersResponse = await fetch('/api/users')
      const usersData = await usersResponse.json()
      setUsers(usersData)
    }
    fetchData()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const taskData = Object.fromEntries(formData.entries())
    taskData.userIds = selectedUsers.map(user => user.id)

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })

      if (response.ok) {
        router.push('/tasks')
      } else {
        console.error('Failed to add task')
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const handleUserToggle = user => {
    setSelectedUsers(prev =>
      prev.some(u => u.id === user.id) ? prev.filter(u => u.id !== user.id) : [...prev, user]
    )
  }

  return (
    <div className='container mx-auto p-4 pl-10 max-w-2xl'>
      <h1 className='text-2xl font-bold mb-6'>Add New Task</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className='text-lg font-semibold'>Task Details</h2>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='title'>Title</Label>
              <Input
                id='title'
                name='title'
                placeholder='Enter task title'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='body'>Description</Label>
              <Textarea
                id='body'
                name='body'
                placeholder='Enter task description'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='dueDate'>Due Date</Label>
              <Input
                id='dueDate'
                name='dueDate'
                type='date'
                className='w-full'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select
                id='status'
                name='status'>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Not Started'>Not Started</SelectItem>
                  <SelectItem value='In Progress'>In Progress</SelectItem>
                  <SelectItem value='Stuck'>Stuck</SelectItem>
                  <SelectItem value='Waiting'>Waiting</SelectItem>
                  <SelectItem value='Done'>Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='priority'>Priority</Label>
              <Select
                id='priority'
                name='priority'>
                <SelectTrigger>
                  <SelectValue placeholder='Select priority' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Low'>Low</SelectItem>
                  <SelectItem value='Medium'>Medium</SelectItem>
                  <SelectItem value='High'>High</SelectItem>
                  <SelectItem value='Urgent'>Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='category'>Category</Label>
              <Input
                id='category'
                name='category'
                placeholder='Enter task category'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='projectId'>Project</Label>
              <Select
                id='projectId'
                name='projectId'>
                <SelectTrigger>
                  <SelectValue placeholder='Select project' />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem
                      key={project.id}
                      value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label>Assigned Users</Label>
              <div className='space-y-2 max-h-40 overflow-y-auto p-2 border rounded'>
                {users.map(user => (
                  <div
                    key={user.id}
                    className='flex items-center space-x-2'>
                    <Checkbox
                      id={`user-${user.id}`}
                      checked={selectedUsers.some(u => u.id === user.id)}
                      onCheckedChange={() => handleUserToggle(user)}
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className='text-sm'>
                      {user.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button
              variant='outline'
              onClick={() => router.push('/tasks')}>
              Cancel
            </Button>
            <Button type='submit'>Add Task</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AddTaskPage
