import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import medicalAnimation from '../assets/medical-scan.json'
import pulseAnimation from '../assets/pulse.json'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PredictionResult({ prediction }) {
  if (!prediction) return null;

  const { topDisease, otherPossibilities } = prediction;
  const allDiseases = [topDisease, ...otherPossibilities];
  
  const chartData = {
    labels: allDiseases.map(() => ""),
    datasets: [{
      label: 'Confidence Score',
      data: allDiseases.map(d => (d.confidence).toFixed(1)),
      backgroundColor: [
        'rgba(37, 99, 235, 0.9)',  // Solid blue for top disease
        ...otherPossibilities.map(() => 'rgba(96, 165, 250, 0.7)') // Lighter blue for others
      ],
      borderWidth: 0,
      borderRadius: 2,
      barThickness: 12,
      maxBarThickness: 40
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Disease Prediction Confidence Scores',
        color: '#1e293b', // slate-800
        font: {
          size: 20,
          weight: '600',
          family: 'system-ui'
        },
        padding: { bottom: 30 }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleFont: {
          size: 14,
          family: 'system-ui'
        },
        bodyFont: {
          size: 13,
          family: 'system-ui'
        },
        padding: 12,
        callbacks: {
          label: (context) => `Confidence: ${context.raw}%`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(226, 232, 240, 0.4)',  // Very light grid lines
          drawBorder: false
        },
        border: {
          display: false
        },
        ticks: {
          font: {
            size: 12,
            family: 'system-ui'
          },
          color: '#64748b',
          padding: 8,
          stepSize: 20  // Show ticks at intervals of 20
        },
        title: {
          display: true,
          text: 'Possibility (%)',
          color: '#475569',
          font: {
            size: 14,
            weight: '500',
            family: 'system-ui'
          },
          padding: { bottom: 20 }
        }
      },
      x: {
        grid: {
          display: false
        },
        border: {
          display: false
        },
        ticks: {
          display: false
        },
        title: {
          display: false
        }
      }
    },
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: `${topDisease.confidence}%`,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }
    }
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative">
        <div className="absolute top-0 right-0 w-32 h-32 opacity-50">
          <Lottie
            animationData={pulseAnimation}
            loop={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <motion.div
          className="p-6 bg-card rounded-lg border shadow-lg relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 to-primary animate-pulse" />
          
          <div className="flex items-start gap-4">
            <div className="w-16 h-16">
              <Lottie
                animationData={medicalAnimation}
                loop={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-1">Predicted Condition</h2>
                <h3 className="text-2xl font-medium text-primary">{topDisease.name}</h3>
              </motion.div>

              <motion.p 
                className="text-muted-foreground"
                variants={itemVariants}
              >
                {topDisease.description}
              </motion.p>

              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Possibility Score</span>
                  <motion.span
                    className="font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {topDisease.confidence.toFixed(1)}%
                  </motion.span>
                </div>
                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    variants={progressVariants}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-[300px]">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <motion.div
        className="p-4 bg-muted rounded-lg border shadow-sm"
        variants={itemVariants}
      >
        <p className="text-sm text-muted-foreground">
          <strong className="text-primary">Important Note:</strong> This is an AI-powered prediction 
          based on the symptoms you provided. For accurate medical diagnosis and treatment, 
          please consult with a qualified healthcare professional.
        </p>
      </motion.div>
    </motion.div>
  )
} 