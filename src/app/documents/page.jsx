// import { getFile } from '../../../lib/s3'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { projectId } = request.query;

  const files = await prisma.file.findMany({
    where: { projectId },
    orderBy: { uploadedAt: 'desc' }
  });

  return NextResponse.json({ files });
}

export default function ProjectFiles({ projectId }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`/api/files?projectId=${projectId}`)
      .then(res => res.json())
      .then(data => setFiles(data.files));
  }, [projectId]);

  return (
    <div>
      <h2>Project Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            <a
              href={file.s3Url}
              target='_blank'
              rel='noopener noreferrer'>
              {file.filename}
            </a>
            <p>Type: {file.fileType}</p>
            <p>Uploaded: {new Date(file.uploadedAt).toLocaleString()}</p>
            <p>Description: {file.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
