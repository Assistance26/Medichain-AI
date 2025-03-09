import * as tf from '@tensorflow/tfjs'
import { symptoms, diseases, generateTrainingData } from '../data/medical_data'

class ModelService {
  constructor() {
    this.model = null
    this.isTraining = false
    this.isReady = false
  }

  async initialize() {
    if (this.model) return

    // Create the model architecture
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({
          units: 32,
          activation: 'relu',
          inputShape: [symptoms.length]
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.dense({
          units: 16,
          activation: 'relu'
        }),
        tf.layers.dropout({ rate: 0.1 }),
        tf.layers.dense({
          units: diseases.length,
          activation: 'softmax'
        })
      ]
    })

    // Compile the model
    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    })

    await this.trainModel()
  }

  async trainModel() {
    if (this.isTraining) return
    this.isTraining = true

    try {
      // Generate training data
      const { trainingData, trainingLabels } = generateTrainingData()

      // Convert to tensors
      const xs = tf.tensor2d(trainingData)
      const ys = tf.tensor2d(trainingLabels)

      // Train the model
      await this.model.fit(xs, ys, {
        epochs: 50,
        batchSize: 32,
        validationSplit: 0.2,
        shuffle: true,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`)
          }
        }
      })

      // Cleanup tensors
      xs.dispose()
      ys.dispose()

      this.isReady = true
    } catch (error) {
      console.error('Error training model:', error)
    } finally {
      this.isTraining = false
    }
  }

  async predict(selectedSymptoms) {
    if (!this.model || !this.isReady) {
      throw new Error('Model is not ready')
    }

    // Create input tensor from selected symptoms
    const input = tf.tensor2d([
      symptoms.map(symptom => selectedSymptoms.has(symptom.id) ? 1 : 0)
    ])

    // Make prediction
    const prediction = await this.model.predict(input)
    const probabilities = await prediction.data()

    // Cleanup tensors
    input.dispose()
    prediction.dispose()

    // Map probabilities to diseases
    const results = diseases.map((disease, index) => ({
      ...disease,
      confidence: probabilities[index] * 100
    }))

    // Sort by confidence
    const sortedResults = results.sort((a, b) => b.confidence - a.confidence)

    return {
      topDisease: sortedResults[0],
      otherPossibilities: sortedResults.slice(1)
    }
  }
}

// Create a singleton instance
const modelService = new ModelService()
export default modelService 