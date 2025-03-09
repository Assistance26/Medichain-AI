import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { symptoms } from '../data/medical_data'
import modelService from '../services/modelServices'

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

function SelectedSymptom({ symptom, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex items-center gap-2 p-2 bg-primary/40 text-primary-foreground rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{symptom.name}</span>
      <motion.button
        onClick={() => onRemove(symptom.id)}
        className="p-1 hover:bg-primary/80 rounded-full"
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        ×
      </motion.button>
    </motion.div>
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
          {modelStatus === 'initializing' && (
            <motion.span
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Initializing AI model...
            </motion.span>
          )}
        </motion.div>

        <div className="relative" style={{ zIndex: 1000 }}>
          <SearchableSymptomDropdown
            onSelect={handleAddSymptom}
            selectedSymptoms={selectedSymptoms}
          />
        </div>

        <AnimatePresence>
          {selectedSymptomDetails.length > 0 && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h3 className="text-sm font-medium mb-2">Selected Symptoms</h3>
              <motion.div layout className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedSymptomDetails.map((symptom) => (
                    <SelectedSymptom
                      key={symptom.id}
                      symptom={symptom}
                      onRemove={handleRemoveSymptom}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
          {isLoading ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Analyzing...
            </motion.span>
          ) : modelStatus === 'ready' ? (
            'Check Symptoms'
          ) : (
            'Loading AI Model...'
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {modelStatus === 'error' && (
          <motion.p
            className="text-sm text-destructive text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Error loading the AI model. Please refresh the page to try again.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
} 