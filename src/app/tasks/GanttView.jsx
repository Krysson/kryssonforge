// src/app/tasks/GanttView.jsx
import React, { useEffect, useRef } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

const GanttView = ({ tasks }) => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    let gantt;
    if (typeof window !== 'undefined') {
      gantt = require('dhtmlx-gantt');
    }

    if (ganttContainer.current && gantt) {
      try {
        gantt.init(ganttContainer.current);

        gantt.config.date_format = '%Y-%m-%d %H:%i';
        gantt.config.scale_height = 50;
        gantt.config.row_height = 30;
        gantt.config.task_height = 16;

        gantt.config.columns = [
          { name: 'text', label: 'Task name', width: '*', tree: true },
          { name: 'start_date', label: 'Start time', align: 'center' },
          { name: 'duration', label: 'Duration', align: 'center' },
          { name: 'priority', label: 'Priority', align: 'center' }
        ];

        gantt.templates.task_class = (start, end, task) => {
          switch (task.priority) {
            case 'High':
              return 'high-priority';
            case 'Medium':
              return 'medium-priority';
            default:
              return 'low-priority';
          }
        };

        const formattedTasks = tasks.map(task => ({
          id: task.id,
          text: task.title,
          start_date: new Date(task.startDate),
          end_date: new Date(task.endDate),
          priority: task.priority,
          progress: 0
        }));

        gantt.parse({ data: formattedTasks });
      } catch (error) {
        console.error('Error initializing Gantt chart:', error);
      }
    }

    return () => {
      if (gantt && gantt.destructor) {
        gantt.destructor();
      }
    };
  }, [tasks]);

  return (
    <div>
      <style
        jsx
        global>{`
        .high-priority .gantt_task_progress {
          background: #ff5722;
        }
        .medium-priority .gantt_task_progress {
          background: #ffc107;
        }
        .low-priority .gantt_task_progress {
          background: #4caf50;
        }
      `}</style>
      <div
        ref={ganttContainer}
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default GanttView;
