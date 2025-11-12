import { useState } from 'react'
import Navbar from './components/Navbar'
import SecondaryNav from './components/SecondaryNav'
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

  // Handler for when topic cards are clicked - go directly to comparison view
  const handleTopicCardClick = () => {
    setShowComparison(true)
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
    return (
      <>
        <Navbar />
        <SecondaryNav activePage="compare-segments" showSegmentCards={true} />
        <ComparisonView onSelectData={handleOpenModal} onReset={handleReset} />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <SecondaryNav activePage="compare-segments" showSegmentCards={true} />
      <EmptyState
        onOpenModal={handleOpenModal}
        onOpenTemplateModal={handleOpenTemplateModal}
        onTopicCardClick={handleTopicCardClick}
      />
      {showModal && <HealthDataModal onClose={handleCloseModal} />}
      {showTemplateModal && <TemplateModal isOpen={showTemplateModal} onClose={handleCloseTemplateModal} onLoadTemplate={handleLoadTemplate} />}
    </>
  )
}

export default App