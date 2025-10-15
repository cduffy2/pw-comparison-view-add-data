import { useState } from 'react'
import EmptyState from './EmptyState'
import HealthDataModal from './HealthDataModal'
import TemplateModal from './TemplateModal'
import ComparisonView from './ComparisonView'
import './index.css'

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [showComparison, setShowComparison] = useState(false)

  const handleOpenModal = () => {
    setShowComparison(false)
    setShowModal(true)
  }

  const handleOpenTemplateModal = () => {
    setShowComparison(false)
    setShowTemplateModal(true)
  }

  const handleCloseModal = (shouldCompare) => {
    setShowModal(false)
    if (shouldCompare) {
      setShowComparison(true)
    }
  }

  const handleCloseTemplateModal = () => {
    setShowTemplateModal(false)
  }

  const handleLoadTemplate = (templateId) => {
    setShowTemplateModal(false)
    setShowComparison(true)
  }

  const handleReset = () => {
    setShowComparison(false)
    setShowModal(false)
    setShowTemplateModal(false)
  }

  if (showComparison) {
    return <ComparisonView onSelectData={handleOpenModal} onReset={handleReset} />
  }

  return (
    <>
      <EmptyState onOpenModal={handleOpenModal} onOpenTemplateModal={handleOpenTemplateModal} />
      {showModal && <HealthDataModal onClose={handleCloseModal} />}
      {showTemplateModal && <TemplateModal isOpen={showTemplateModal} onClose={handleCloseTemplateModal} onLoadTemplate={handleLoadTemplate} />}
    </>
  )
}

export default App