import { createContext, useContext, useEffect, useState } from 'react'
import { BrowserRouter, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Landing from './pages/Landing'
import UserType from './pages/UserType'
import FarmerDashboard from './pages/FarmerDashboard'
import FPODashboard from './pages/FPODashboard'
import BuyerDashboard from './pages/BuyerDashboard'
import DemandForecast from './pages/DemandForecast'
import ReverseMandi from './pages/ReverseMandi'
import FPOAggregation from './pages/FPOAggregation'
import AIDecisionEngine from './pages/AIDecisionEngine'
import Logistics from './pages/Logistics'
import GovernmentSchemes from './pages/GovernmentSchemes'
import ProfitCalculator from './pages/ProfitCalculator'
import FinalReport from './pages/FinalReport'
import Impact from './pages/Impact'

import { defaultAppState, demoAppState } from './data/demoData'
import { LanguageProvider } from './i18n/LanguageContext'


// --------------------------------------------------
// APP CONTEXT
// --------------------------------------------------

const AppContext = createContext()

export const useApp = () => useContext(AppContext)


// --------------------------------------------------
// LOAD SAVED STATE
// --------------------------------------------------

const storedState = () => {
  try {
    return {
      ...defaultAppState,
      ...(JSON.parse(localStorage.getItem('ac')) || {}),
    }
  } catch {
    return defaultAppState
  }
}


// --------------------------------------------------
// ROUTE VIEW
// --------------------------------------------------

function RouteView() {
  const { pathname } = useLocation()
  const app = useApp()

  const props = {
    ...app,
  }

  const routes = {
    '/': <Landing />,
    '/usertype': <UserType />,

    '/farmer': <FarmerDashboard {...props} />,
    '/fpo': <FPODashboard {...props} />,
    '/buyer': <BuyerDashboard {...props} />,

    '/forecast': <DemandForecast {...props} />,
    '/reverse-mandi': <ReverseMandi {...props} />,
    '/fpo-aggregation': <FPOAggregation {...props} />,
    '/decision-engine': <AIDecisionEngine {...props} />,
    '/logistics': <Logistics {...props} />,
    '/schemes': <GovernmentSchemes {...props} />,

    // Profit Calculator
    '/profit-calculator': <ProfitCalculator {...props} />,

    '/report': <FinalReport {...props} />,
    '/impact': <Impact {...props} />,
  }

  return routes[pathname] || <FarmerDashboard {...props} />
}


// --------------------------------------------------
// APPLICATION SHELL
// --------------------------------------------------

function Shell() {
  const { pathname } = useLocation()
  const { demo } = useApp()

  const landing = pathname === '/' || pathname === '/usertype'

  return (
    <>
      <Navbar demo={demo} />

      {landing ? (
        <main>
          <RouteView />
        </main>
      ) : (
        <div className="app">
          <Sidebar />

          <main className="work">
            <RouteView />
          </main>
        </div>
      )}
    </>
  )
}


// --------------------------------------------------
// MAIN APP
// --------------------------------------------------

export default function App() {
  const [state, setState] = useState(storedState)

  // Save application state to localStorage
  useEffect(() => {
    localStorage.setItem('ac', JSON.stringify(state))
  }, [state])

  // Demo mode
  const demo = () => {
    setState(demoAppState)
  }

  return (
    <LanguageProvider>
      <AppContext.Provider
        value={{
          state,
          setState,
          demo,
        }}
      >
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </AppContext.Provider>
    </LanguageProvider>
  )
}