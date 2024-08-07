// src/components/FeatureCardsSection.jsx
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CreditCard, CheckSquare, FileText, Briefcase, MapPin, MessageSquare } from 'lucide-react'

const FeatureCard = ({ title, description, Icon }) => (
  <Card className='shadow-lg hover:shadow-xl transition-shadow duration-300'>
    <CardContent className='p-6 flex flex-col items-center '>
      <Icon className='w-12 h-12 mb-4 text-gray-600' />
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </CardContent>
  </Card>
)

const FeatureCards = () => {
  const features = [
    { title: 'CRM', description: 'Manage customer relationships effectively', Icon: CreditCard },
    { title: 'Tasks', description: 'Organize and track your teams tasks', Icon: CheckSquare },
    { title: 'Documents', description: 'Centralize and manage all your documents', Icon: FileText },
    { title: 'Projects', description: 'Plan and execute projects seamlessly', Icon: Briefcase },
    { title: 'Field Ready', description: 'Manage on-site operations efficiently', Icon: MapPin },
    {
      title: 'Real Time Communication',
      description: 'Collaborate in real-time with your team',
      Icon: MessageSquare
    }
  ]

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-5xl font-bold text-center mb-12'>Make every step user-centric</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCards
