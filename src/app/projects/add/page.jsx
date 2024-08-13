// add projects page
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const AddProjectPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/api/companies')
        if (response.ok) {
          const data = await response.json()
          setCompanies(data)
        } else {
          console.error('Failed to fetch companies')
        }
      } catch (error) {
        console.error('Error fetching companies:', error)
      }
    }

    fetchCompanies()
  }, [])

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.target)
    const projectData = Object.fromEntries(formData.entries())

    // Convert string dates to Date objects
    projectData.startDate = new Date(projectData.startDate).toISOString()
    projectData.endDate = new Date(projectData.endDate).toISOString()

    // Convert completionPercentage to number
    projectData.completionPercentage = parseInt(projectData.completionPercentage, 10)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      })

      if (response.ok) {
        router.push('/projects')
      } else {
        console.error('Failed to add project')
      }
    } catch (error) {
      console.error('Error adding project:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>Add New Project</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <h2 className='text-xl font-semibold'>Project Details</h2>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Project Name</Label>
              <Input
                id='name'
                name='name'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                name='description'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='number'>Project Number</Label>
              <Input
                id='number'
                name='number'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='location'>Location</Label>
              <Input
                id='location'
                name='location'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='projectManager'>Project Manager</Label>
              <Input
                id='projectManager'
                name='projectManager'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='generalContractor'>General Contractor</Label>
              <Input
                id='generalContractor'
                name='generalContractor'
                required
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='companyId'>Company</Label>
              <Select
                name='companyId'
                required>
                <SelectTrigger>
                  <SelectValue placeholder='Select company' />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem
                      key={company.id}
                      value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='contractPrice'>Contract Price</Label>
              <Input
                id='contractPrice'
                name='contractPrice'
                type='text'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='completionPercentage'>Completion Percentage</Label>
              <Input
                id='completionPercentage'
                name='completionPercentage'
                type='number'
                min='0'
                max='100'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='startDate'>Start Date</Label>
              <Input
                id='startDate'
                name='startDate'
                type='date'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='endDate'>End Date</Label>
              <Input
                id='endDate'
                name='endDate'
                type='date'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Select name='status'>
                <SelectTrigger>
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Not Started'>Not Started</SelectItem>
                  <SelectItem value='In Progress'>In Progress</SelectItem>
                  <SelectItem value='Completed'>Completed</SelectItem>
                  <SelectItem value='On Hold'>On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className='flex justify-between'>
            <Button
              variant='outline'
              onClick={() => router.push('/projects')}>
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={loading}>
              {loading ? 'Adding...' : 'Add Project'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default AddProjectPage
