'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpDown, MoreHorizontal, Plus } from 'lucide-react';

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [sortColumn, setSortColumn] = useState('lastModified');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/files');
      const data = await response.json();
      if (data.success) {
        setFiles(data.files);
      } else {
        console.error('Failed to fetch files:', data.error);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleString();
  };

  const formatSize = bytes => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  const sortFiles = column => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const downloadFile = async key => {
    try {
      const response = await fetch(`/api/download?key=${encodeURIComponent(key)}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = key;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const deleteFile = async key => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        const response = await fetch(`/api/delete?key=${encodeURIComponent(key)}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          fetchFiles(); // Refresh the file list
        } else {
          console.error('Failed to delete file:', data.error);
        }
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const LoadingSkeleton = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className='h-4 w-[250px]' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-[100px]' />
          </TableCell>
          <TableCell>
            <Skeleton className='h-4 w-[50px]' />
          </TableCell>
          <TableCell className='text-right'>
            <Skeleton className='h-8 w-8 rounded-full ml-auto' />
          </TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div className='container mx-auto py-10'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Uploaded Files</h1>
        <Button onClick={() => router.push('/upload')}>
          <Plus className='mr-2 h-4 w-4' /> New File
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your uploaded files.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[300px]'>
              <Button
                variant='ghost'
                onClick={() => sortFiles('key')}>
                File Name
                <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant='ghost'
                onClick={() => sortFiles('lastModified')}>
                Last Modified
                <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant='ghost'
                onClick={() => sortFiles('size')}>
                Size
                <ArrowUpDown className='ml-2 h-4 w-4' />
              </Button>
            </TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            sortedFiles.map(file => (
              <TableRow key={file.key}>
                <TableCell className='font-medium'>{file.key}</TableCell>
                <TableCell>{formatDate(file.lastModified)}</TableCell>
                <TableCell>{formatSize(file.size)}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => window.open(file.url, '_blank')}>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => downloadFile(file.key)}>
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => deleteFile(file.key)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
