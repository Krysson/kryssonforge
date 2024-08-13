const MyCompany = () => {
  return (
    <div className='text-3xl'>
      My Company Page{' '}
      <div class='bg-gray-100 flex items-center justify-center h-screen'>
        <div class='bg-white p-6 rounded shadow-lg hover:drop-shadow-xl max-w-md w-full'>
          <h1 class='text-xl font-bold mb-4 pb-10 text-gray-500'>My Company Information</h1>
          <div class='text-gray-700'>
            <div className='pb-7'>
              <p>
                <span
                  id='companyName'
                  class='select-all font-bold text-gray-800'>
                  Architectural Sheet Metal, Inc.
                </span>
              </p>
            </div>
            <p className='pb-5'>
              <span
                id='companyAddress'
                class='select-all pt-5'>
                1801 Premier Row, Orlando, FL, 32819
              </span>
            </p>
            <p className='pb-5'>
              <span
                id='companyPhone'
                class='select-all'>
                (407) 855-7183
              </span>
            </p>
            <p className='pb-5'>
              <span
                id='companyEmail'
                class='select-all'>
                sales@asmfl.com
              </span>
            </p>
            <p className='pb-5'>
              <span
                id='companyWebsite'
                class='select-all'>
                www.asmfl.net
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCompany
