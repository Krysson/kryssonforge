'use client';
import React, { useEffect, useRef } from 'react';

const ProjectScheduler = () => {
  const ganttContainer = useRef(null);
  const ganttInstance = useRef(null);

  useEffect(() => {
    const loadGantt = async () => {
      const ganttModule = await import('dhtmlx-gantt');
      await import('dhtmlx-gantt/codebase/dhtmlxgantt.css');

      ganttModule.default.init(ganttContainer.current);
      ganttInstance.current = ganttModule.default;

      // Configure date parsing and formatting
      ganttInstance.current.config.date_format = '%Y-%m-%d %H:%i';
      ganttInstance.current.config.xml_date = '%Y-%m-%d %H:%i';

      // Enable dynamic loading (might help with rendering issues)
      ganttInstance.current.config.dynamic_loading = true;

      // Set scale configuration
      ganttInstance.current.config.scale_unit = 'month';
      ganttInstance.current.config.date_scale = '%F %Y'; // Full month name and year
      ganttInstance.current.config.subscales = [{ unit: 'day', step: 1, date: '%d' }]; // Day of the month

      const tasks = {
        data: [
          {
            id: 1,
            text: 'Main Project #1',
            start_date: new Date('2024-08-15T08:00:00'),
            duration: 5,
            progress: 0.6,
            open: true
          },
          {
            id: 2,
            text: 'Main Project #1 Subtask 1',
            start_date: new Date('2024-08-15T08:00:00'),
            duration: 2,
            progress: 0.5,
            parent: 1
          },
          {
            id: 3,
            text: 'Main Project #1 Subtask 2',
            start_date: new Date('2024-08-17T08:00:00'),
            duration: 3,
            progress: 0.7,
            parent: 1
          },
          {
            id: 4,
            text: 'Main Project #2',
            start_date: new Date('2024-08-20T08:00:00'),
            duration: 4,
            progress: 0.4
          },
          {
            id: 5,
            text: 'Main Project #2 Subtask 2',
            start_date: new Date('2024-08-17T08:00:00'),
            duration: 3,
            progress: 0.7,
            parent: 4
          }
        ],
        links: [
          { id: 1, source: 1, target: 4, type: '0' },
          { id: 2, source: 2, target: 3, type: '0' }
        ]
      };

      ganttInstance.current.parse(tasks);

      // Set visible range
      const startDate = new Date(2024, 7, 1); // August 1, 2024
      const endDate = new Date(2024, 8, 30); // September 30, 2024
      ganttInstance.current.config.start_date = startDate;
      ganttInstance.current.config.end_date = endDate;

      // Force repaint after configuration
      ganttInstance.current.render();

      // Debug: Log parsed tasks
      console.log('Parsed tasks:', ganttInstance.current.getTaskByTime());
    };

    loadGantt();

    return () => {
      if (ganttInstance.current) {
        ganttInstance.current.destructor();
        ganttInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={ganttContainer}
      style={{ width: '100%', height: '500px' }}></div>
  );
};

export default ProjectScheduler;
