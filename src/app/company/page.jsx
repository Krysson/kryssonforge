import CompaniesList from './CompaniesList'
import { fetchCompanies } from '/lib/data'

export default async function CompaniesPage() {
  const companies = await fetchCompanies()

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Companies</h1>
      <CompaniesList initialCompanies={companies} />
    </div>
  )
}
