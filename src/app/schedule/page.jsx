import dynamic from 'next/dynamic';

const ProjectScheduler = dynamic(() => import('@/components/ProjectScheduler'), { ssr: false });

export default function SchedulerPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold pb-5 pt-5'>Project Gantt Chart</h1>
      <ProjectScheduler />
    </div>
  );
}
