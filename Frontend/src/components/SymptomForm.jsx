import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { symptoms } from '../data/medical_data'
import modelService from '../services/modelServices'
import Lottie from 'lottie-react'
import doctorAnimation from '../assets/doctor.json'

function SearchableSymptomDropdown({ onSelect, selectedSymptoms }) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredSymptoms = query === ''
    ? symptoms
    : symptoms
        .filter(symptom => 
          symptom.name.toLowerCase().includes(query.toLowerCase()) &&
          !selectedSymptoms.has(symptom.id)
        )
        .sort((a, b) => {
          const aStartsWith = a.name.toLowerCase().startsWith(query.toLowerCase())
          const bStartsWith = b.name.toLowerCase().startsWith(query.toLowerCase())
          if (aStartsWith && !bStartsWith) return -1
          if (!aStartsWith && bStartsWith) return 1
          return a.name.localeCompare(b.name)
        })

  const handleSelect = (symptom) => {
    onSelect(symptom)
    setQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative z-50">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <input
          type="text"
          className="w-full p-3 border rounded-lg bg-background shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          placeholder="Type to search symptoms..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && filteredSymptoms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[100] w-full mt-1 border text-black bg-white rounded-lg shadow-lg max-h-60 overflow-auto"
            style={{ position: 'absolute', top: '100%' }}
          >
            {filteredSymptoms.map((symptom, index) => (
              <motion.button
                key={symptom.id}
                className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
                onClick={() => handleSelect(symptom)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                {symptom.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SymptomForm({ onPrediction }) {
  const [selectedSymptoms, setSelectedSymptoms] = useState(new Set())
  const [selectedSymptomDetails, setSelectedSymptomDetails] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [modelStatus, setModelStatus] = useState('initializing')
  const [error, setError] = useState(null)

  useEffect(() => {
    initializeModel()
  }, [])

  const initializeModel = async () => {
    try {
      await modelService.initialize()
      setModelStatus('ready')
    } catch (error) {
      console.error('Error initializing model:', error)
      setModelStatus('error')
    }
  }

  const handleAddSymptom = (symptom) => {
    if (!selectedSymptoms.has(symptom.id)) {
      const newSelectedSymptoms = new Set(selectedSymptoms)
      newSelectedSymptoms.add(symptom.id)
      setSelectedSymptoms(newSelectedSymptoms)
      setSelectedSymptomDetails([...selectedSymptomDetails, symptom])
      setError(null)
    }
  }

  const handleRemoveSymptom = (symptomId) => {
    const newSelectedSymptoms = new Set(selectedSymptoms)
    newSelectedSymptoms.delete(symptomId)
    setSelectedSymptoms(newSelectedSymptoms)
    setSelectedSymptomDetails(selectedSymptomDetails.filter(s => s.id !== symptomId))
  }

  const handleCheckSymptoms = async () => {
    if (modelStatus !== 'ready') return
    
    if (selectedSymptoms.size === 0) {
      setError('Please select at least one symptom.')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const prediction = await modelService.predict(selectedSymptoms)
      onPrediction(prediction)
    } catch (error) {
      console.error('Prediction error:', error)
      setError('An error occurred while making the prediction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4 relative" style={{ zIndex: 1000 }}>
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold">Select Your Symptoms</h2>
        </motion.div>

        <div className="relative" style={{ zIndex: 1000 }}>
          <SearchableSymptomDropdown
            onSelect={handleAddSymptom}
            selectedSymptoms={selectedSymptoms}
          />
        </div>

        {error && (
          <motion.p
            className="text-sm text-destructive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.button
          onClick={handleCheckSymptoms}
          disabled={isLoading || modelStatus !== 'ready'}
          className={`
            w-full py-3 px-4 rounded-lg font-medium transition-all
            ${
              isLoading || modelStatus !== 'ready'
                ? 'bg-muted text-muted-foreground cursor-not-allowed'
                : 'bg-primary text-white text-primary-foreground hover:bg-primary/90'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Analyzing...' : modelStatus === 'ready' ? 'Check Symptoms' : 'Loading AI Model...'}
        </motion.button>

        {modelStatus === 'initializing' && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-sm text-muted-foreground"></p>
            <Lottie animationData={doctorAnimation} className="w-40 h-50" />
          </div>
        )}
      </div>
    </div>
  )
}
