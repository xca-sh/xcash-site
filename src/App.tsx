import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CodePreview from './components/CodePreview'
import Pricing from './components/Pricing'
import Security from './components/Security'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CodePreview />
      <Pricing />
      <Security />
      <Footer />
    </div>
  )
}

export default App
