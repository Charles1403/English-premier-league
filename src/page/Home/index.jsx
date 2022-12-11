import Table from '../../components/Table'
import {data} from '../../data'
import { getAllIndividualTeamStats } from '../../helpers'


function Home() {
  return (
    <div className='App'>
      <Table Stats={getAllIndividualTeamStats}/>
    </div>
  )
}

export default Home;