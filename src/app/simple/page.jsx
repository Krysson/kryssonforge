export default function SendAws() {
  const [message, setMessage] = React.useState();
  const [files, setFiles] = React.useState();

  function storeFile(e) {
    console.log('test3');
    setFiles(e.target.files[0]);
  }

  const uploadFile = async () => {
    setMessage('Uploading!');

    var returnData = await aws(file); // Upload file to S3
    setMessage(String(returnData));

    setFile(null);
  };

  return (
    <>
      <p>upload file:</p>
      <p style={{ color: 'red' }}>{message}</p>
      <input
        type='file'
        onChange={e => storeFile(e)}
      />

      <input
        type='button'
        onClick={uploadFile}
        defaultValue={'Send'}
      />
    </>
  );
}
