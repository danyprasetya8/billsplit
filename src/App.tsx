import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreatePlace from '@/pages/CreatePlace'
import PlaceDetail from '@/pages/PlaceDetail'
import PlaceList from '@/pages/PlaceList/PlaceList'
import BillList from '@/pages/BillList'
import BaseLayout from '@/components/BaseLayout'
import constant from '@/config/constant'
import styles from './App.module.css'

const { page } = constant

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route path={page.base} element={<BaseLayout />}>
            <Route index element={<PlaceList />} />
            <Route path={page.place} element={<PlaceList />} />
            <Route path={page.placeDetail} element={<PlaceDetail />} />
            <Route path={page.createPlace} element={<CreatePlace />} />
            <Route path={page.bill} element={<BillList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
