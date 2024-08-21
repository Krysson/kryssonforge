// File: src/components/Dashboard.jsx

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer } from 'recharts';
import ChatSection from '@/components/ChatSection';
import VideoSection from '@/components/VideoSection';

const Chart = ({ data }) => (
  <ResponsiveContainer
    width='100%'
    height='100%'>
    <BarChart data={data}>
      <XAxis dataKey='month' />
      <YAxis tickFormatter={value => `$${value / 1000}k`} />
      <Tooltip />
      <Bar
        dataKey='billings'
        fill='#8884d8'
        activeBar={
          <Rectangle
            fill='gold'
            stroke='purple'
          />
        }
      />
    </BarChart>
  </ResponsiveContainer>
);
Chart.displayName = 'Chart';

const generateMonthlyBillings = () =>
  [...Array(12)].map((_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    billings: Math.floor(Math.random() * 50000) + 10000
  }));

const formatCurrency = value => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const MetricCard = ({ title, value, change, isCurrency = false, isPercentage = false }) => (
  <Card className='w-[250px]'>
    <CardHeader className='font-semibold'>{title}</CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>
        {isCurrency && '$'}
        {value}
        {isPercentage && '%'}
      </div>
      {change !== undefined && (
        <div className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </CardContent>
  </Card>
);
MetricCard.displayName = 'MetricCard';

const Dashboard = () => {
  const [monthlyBillings, setMonthlyBillings] = useState([]);
  const [activeTab, setActiveTab] = useState('metrics');

  // Dummy data for metrics
  const activeProjects = 12;
  const openTasks = 45;
  const openTasksPercentage = 75;
  const totalActiveProjectValue = 1500000;

  useEffect(() => {
    setMonthlyBillings(generateMonthlyBillings());
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='metrics'>Main</TabsTrigger>
          <TabsTrigger value='chat'>Chat</TabsTrigger>
          <TabsTrigger value='video'>Video</TabsTrigger>
        </TabsList>
        <TabsContent value='metrics'>
          <div className='flex space-x-4 mb-4'>
            <MetricCard
              title='Active Projects'
              value={activeProjects}
            />
            <MetricCard
              title='Open Tasks'
              value={openTasks}
              change={openTasksPercentage}
              isPercentage={true}
            />
            <MetricCard
              title='Total Active Project Value'
              value={totalActiveProjectValue.toLocaleString()}
              isCurrency={true}
            />
          </div>
          <Card className='w-full h-[300px]'>
            <CardHeader>Monthly Billings</CardHeader>
            <CardContent className='h-[250px]'>
              <Chart data={monthlyBillings} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='chat'>
          <ChatSection />
        </TabsContent>
        <TabsContent value='video'>
          <VideoSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
