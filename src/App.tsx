import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PlaceList from '@/pages/PlaceList'
import BillList from '@/pages/BillList'
import BaseLayout from '@/components/BaseLayout'
import constant from '@/config/constant'

const { page } = constant

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={page.base} element={<BaseLayout />}>
            <Route index element={<PlaceList />} />
            <Route path={page.place} element={<PlaceList />} /> 
            <Route path={page.bill} element={<BillList />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
