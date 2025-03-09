import { useState } from 'react'
import SymptomForm from '../components/SymptomForm'
import PredictionResult from '../components/PredictionResult'

function SymptomChecker() {
  const [prediction, setPrediction] = useState(null)
  const [showPrediction, setShowPrediction] = useState(false)

  const handlePrediction = (result) => {
    setPrediction(result)
    setShowPrediction(true)
  }

  const handleReset = () => {
    setPrediction(null)
    setShowPrediction(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground">Symptom Checker</h1>
          <p className="text-muted-foreground mt-2">
            Enter your symptoms to get potential disease predictions
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <SymptomForm onPrediction={handlePrediction} />
            {showPrediction && (
              <button
                onClick={handleReset}
                className="w-full py-2 px-4 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg transition-colors"
              >
                Check Different Symptoms
              </button>
            )}
          </div>
          <div>
            {showPrediction && prediction && <PredictionResult prediction={prediction} />}
          </div>
        </div>
      </main>
    </div>
  )
}

export default SymptomChecker;
