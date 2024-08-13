// tasks/page.jsx - showing all tasks in a table
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Plus, ListTodo, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Link from 'next/link'

const TasksPage = () => {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks')
        if (response.ok) {
          const data = await response.json()
          setTasks(data)
        } else {
          console.error('Failed to fetch tasks')
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }

    fetchTasks()
  }, [])

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
          placeholder='Filter tasks...'
          className='max-w-sm'
        />
        <div className='flex space-x-2'>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='todo'>Todo</SelectItem>
              <SelectItem value='in-progress'>In Progress</SelectItem>
              <SelectItem value='done'>Done</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='low'>Low</SelectItem>
              <SelectItem value='medium'>Medium</SelectItem>
              <SelectItem value='high'>High</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='View' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='list'>List</SelectItem>
              <SelectItem value='board'>Board</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Table>
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
          {tasks.map(task => (
            <TableRow key={task.id}>
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
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TasksPage
