import { useState } from 'react'
import EmptyState from './EmptyState'
import HealthDataModal from './HealthDataModal'
import ComparisonView from './ComparisonView'
import './index.css'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const handleOpenModal = () => {
    setShowComparison(false)
    setShowModal(true)
  }

  const handleCloseModal = (shouldCompare) => {
    setShowModal(false)
    if (shouldCompare) {
      setShowComparison(true)
    }
  }

  const handleReset = () => {
    setShowComparison(false)
    setShowModal(false)
  }

  if (showComparison) {
    return <ComparisonView onSelectData={handleOpenModal} onReset={handleReset} />
  }

  return (
    <>
      <EmptyState onOpenModal={handleOpenModal} />
      {showModal && <HealthDataModal onClose={handleCloseModal} />}
    </>
  )
}

export default App