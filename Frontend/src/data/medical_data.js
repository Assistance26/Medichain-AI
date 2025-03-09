export const symptoms = [
    // General Symptoms
    { id: 'fever', name: 'Fever' },
    { id: 'fatigue', name: 'Fatigue' },
    { id: 'weakness', name: 'Weakness' },
    { id: 'chills', name: 'Chills' },
    { id: 'sweating', name: 'Sweating' },
    { id: 'weight_loss', name: 'Weight Loss' },
    { id: 'weight_gain', name: 'Weight Gain' },
    { id: 'loss_of_appetite', name: 'Loss of Appetite' },
  
    // Respiratory Symptoms
    { id: 'cough', name: 'Cough' },
    { id: 'dry_cough', name: 'Dry Cough' },
    { id: 'wet_cough', name: 'Wet Cough' },
    { id: 'difficulty_breathing', name: 'Difficulty Breathing' },
    { id: 'shortness_of_breath', name: 'Shortness of Breath' },
    { id: 'chest_pain', name: 'Chest Pain' },
    { id: 'rapid_breathing', name: 'Rapid Breathing' },
    { id: 'wheezing', name: 'Wheezing' },
  
    // Digestive Symptoms
    { id: 'nausea', name: 'Nausea' },
    { id: 'vomiting', name: 'Vomiting' },
    { id: 'diarrhea', name: 'Diarrhea' },
    { id: 'constipation', name: 'Constipation' },
    { id: 'abdominal_pain', name: 'Abdominal Pain' },
    { id: 'bloating', name: 'Bloating' },
    { id: 'heartburn', name: 'Heartburn' },
    { id: 'blood_in_stool', name: 'Blood in Stool' },
  
    // Neurological Symptoms
    { id: 'headache', name: 'Headache' },
    { id: 'dizziness', name: 'Dizziness' },
    { id: 'confusion', name: 'Confusion' },
    { id: 'memory_problems', name: 'Memory Problems' },
    { id: 'seizures', name: 'Seizures' },
    { id: 'tremors', name: 'Tremors' },
    { id: 'loss_of_balance', name: 'Loss of Balance' },
    { id: 'numbness', name: 'Numbness' },
  
    // ENT Symptoms
    { id: 'sore_throat', name: 'Sore Throat' },
    { id: 'runny_nose', name: 'Runny Nose' },
    { id: 'nasal_congestion', name: 'Nasal Congestion' },
    { id: 'loss_of_taste', name: 'Loss of Taste' },
    { id: 'loss_of_smell', name: 'Loss of Smell' },
    { id: 'ear_pain', name: 'Ear Pain' },
    { id: 'hearing_loss', name: 'Hearing Loss' },
    { id: 'ringing_in_ears', name: 'Ringing in Ears' },
  
    // Musculoskeletal Symptoms
    { id: 'joint_pain', name: 'Joint Pain' },
    { id: 'muscle_pain', name: 'Muscle Pain' },
    { id: 'back_pain', name: 'Back Pain' },
    { id: 'neck_pain', name: 'Neck Pain' },
    { id: 'stiffness', name: 'Stiffness' },
    { id: 'swelling', name: 'Swelling' },
    { id: 'weakness_in_limbs', name: 'Weakness in Limbs' },
    { id: 'difficulty_walking', name: 'Difficulty Walking' },
  
    // Skin Symptoms
    { id: 'rash', name: 'Rash' },
    { id: 'itching', name: 'Itching' },
    { id: 'skin_discoloration', name: 'Skin Discoloration' },
    { id: 'bruising', name: 'Bruising' },
    { id: 'dry_skin', name: 'Dry Skin' },
    { id: 'excessive_sweating', name: 'Excessive Sweating' },
    { id: 'hives', name: 'Hives' },
    { id: 'skin_lesions', name: 'Skin Lesions' },
  
    // Psychological Symptoms
    { id: 'anxiety', name: 'Anxiety' },
    { id: 'depression', name: 'Depression' },
    { id: 'insomnia', name: 'Insomnia' },
    { id: 'mood_changes', name: 'Mood Changes' },
    { id: 'irritability', name: 'Irritability' },
    { id: 'panic_attacks', name: 'Panic Attacks' },
    { id: 'hallucinations', name: 'Hallucinations' },
    { id: 'delusions', name: 'Delusions' }
  ]
  
  export const diseases = [
    // Respiratory Diseases
    {
      id: 'covid19',
      name: 'COVID-19',
      description: 'A respiratory illness caused by the SARS-CoV-2 virus.',
      symptoms: ['fever', 'dry_cough', 'fatigue', 'difficulty_breathing', 'loss_of_taste', 'loss_of_smell']
    },
    {
      id: 'pneumonia',
      name: 'Pneumonia',
      description: 'An infection that inflames the air sacs in the lungs.',
      symptoms: ['chest_pain', 'fever', 'wet_cough', 'difficulty_breathing', 'rapid_breathing', 'fatigue']
    },
    {
      id: 'bronchitis',
      name: 'Bronchitis',
      description: 'Inflammation of the bronchial tubes that carry air to and from the lungs.',
      symptoms: ['wet_cough', 'fatigue', 'chest_pain', 'shortness_of_breath', 'wheezing']
    },
    {
      id: 'asthma',
      name: 'Asthma',
      description: 'A condition that affects the airways causing periodic attacks of wheezing.',
      symptoms: ['wheezing', 'shortness_of_breath', 'chest_pain', 'difficulty_breathing', 'cough']
    },
  
    // Digestive System Diseases
    {
      id: 'gastroenteritis',
      name: 'Gastroenteritis',
      description: 'Inflammation of the digestive system, commonly known as stomach flu.',
      symptoms: ['nausea', 'vomiting', 'diarrhea', 'fever', 'abdominal_pain']
    },
    {
      id: 'ibs',
      name: 'Irritable Bowel Syndrome',
      description: 'A common disorder affecting the large intestine.',
      symptoms: ['abdominal_pain', 'bloating', 'constipation', 'diarrhea', 'nausea']
    },
    {
      id: 'gerd',
      name: 'Gastroesophageal Reflux Disease',
      description: 'A digestive disorder affecting the ring of muscle between the esophagus and stomach.',
      symptoms: ['heartburn', 'chest_pain', 'difficulty_breathing', 'nausea', 'abdominal_pain']
    },
  
    // Neurological Diseases
    {
      id: 'migraine',
      name: 'Migraine',
      description: 'A neurological condition causing severe headaches and other symptoms.',
      symptoms: ['headache', 'nausea', 'dizziness', 'sensitivity_to_light', 'vomiting']
    },
    {
      id: 'epilepsy',
      name: 'Epilepsy',
      description: 'A neurological disorder characterized by recurrent seizures.',
      symptoms: ['seizures', 'confusion', 'loss_of_consciousness', 'memory_problems', 'anxiety']
    },
    {
      id: 'parkinsons',
      name: "Parkinson's Disease",
      description: 'A progressive nervous system disorder affecting movement.',
      symptoms: ['tremors', 'stiffness', 'loss_of_balance', 'difficulty_walking', 'memory_problems']
    },
  
    // Autoimmune Diseases
    {
      id: 'rheumatoid_arthritis',
      name: 'Rheumatoid Arthritis',
      description: 'An autoimmune disorder affecting joints.',
      symptoms: ['joint_pain', 'swelling', 'stiffness', 'fatigue', 'weakness']
    },
    {
      id: 'lupus',
      name: 'Lupus',
      description: 'A systemic autoimmune disease.',
      symptoms: ['joint_pain', 'rash', 'fatigue', 'fever', 'chest_pain']
    },
    {
      id: 'multiple_sclerosis',
      name: 'Multiple Sclerosis',
      description: 'A disease affecting the central nervous system.',
      symptoms: ['numbness', 'weakness_in_limbs', 'dizziness', 'fatigue', 'vision_problems']
    },
  
    // Mental Health Conditions
    {
      id: 'major_depression',
      name: 'Major Depression',
      description: 'A mood disorder causing persistent feelings of sadness.',
      symptoms: ['depression', 'fatigue', 'insomnia', 'loss_of_appetite', 'anxiety']
    },
    {
      id: 'anxiety_disorder',
      name: 'Generalized Anxiety Disorder',
      description: 'A mental health disorder characterized by persistent and excessive worry.',
      symptoms: ['anxiety', 'insomnia', 'irritability', 'fatigue', 'panic_attacks']
    },
    {
      id: 'schizophrenia',
      name: 'Schizophrenia',
      description: 'A serious mental disorder affecting how a person thinks, feels, and behaves.',
      symptoms: ['hallucinations', 'delusions', 'confusion', 'anxiety', 'depression']
    },
  
    // Cardiovascular Diseases
    {
      id: 'hypertension',
      name: 'Hypertension',
      description: 'High blood pressure that can lead to severe health complications.',
      symptoms: ['headache', 'dizziness', 'chest_pain', 'shortness_of_breath', 'anxiety']
    },
    {
      id: 'coronary_artery_disease',
      name: 'Coronary Artery Disease',
      description: 'A condition affecting the major blood vessels that supply the heart.',
      symptoms: ['chest_pain', 'shortness_of_breath', 'fatigue', 'dizziness', 'nausea']
    },
    {
      id: 'heart_failure',
      name: 'Heart Failure',
      description: 'A chronic condition where the heart cannot pump blood effectively.',
      symptoms: ['shortness_of_breath', 'fatigue', 'swelling', 'rapid_breathing', 'chest_pain']
    },
  
    // Endocrine Diseases
    {
      id: 'diabetes_type2',
      name: 'Type 2 Diabetes',
      description: 'A chronic condition affecting how the body processes blood sugar.',
      symptoms: ['fatigue', 'excessive_thirst', 'frequent_urination', 'weight_loss', 'blurred_vision']
    },
    {
      id: 'hypothyroidism',
      name: 'Hypothyroidism',
      description: 'A condition where the thyroid gland does not produce enough thyroid hormone.',
      symptoms: ['fatigue', 'weight_gain', 'depression', 'dry_skin', 'cold_intolerance']
    },
    {
      id: 'hyperthyroidism',
      name: 'Hyperthyroidism',
      description: 'A condition where the thyroid gland produces too much thyroid hormone.',
      symptoms: ['anxiety', 'weight_loss', 'excessive_sweating', 'tremors', 'insomnia']
    }
  ]
  
  // Training data generation
  export function generateTrainingData() {
    const numSamples = 5000 // Increased number of training samples
    const trainingData = []
    const trainingLabels = []
  
    for (let i = 0; i < numSamples; i++) {
      // Randomly select a disease
      const disease = diseases[Math.floor(Math.random() * diseases.length)]
      
      // Create symptom vector (0 or 1 for each symptom)
      const symptomVector = new Array(symptoms.length).fill(0)
      
      // Add primary symptoms for the disease
      disease.symptoms.forEach(symptomId => {
        const symptomIndex = symptoms.findIndex(s => s.id === symptomId)
        if (symptomIndex !== -1) {
          // 90% chance of showing each primary symptom
          if (Math.random() < 0.9) {
            symptomVector[symptomIndex] = 1
          }
        }
      })
      
      // Add related symptoms (symptoms that commonly occur together)
      symptoms.forEach((symptom, index) => {
        if (symptomVector[index] === 1) {
          // Add related symptoms with 40% probability
          const relatedSymptoms = getRelatedSymptoms(symptom.id)
          relatedSymptoms.forEach(relatedId => {
            const relatedIndex = symptoms.findIndex(s => s.id === relatedId)
            if (relatedIndex !== -1 && symptomVector[relatedIndex] === 0 && Math.random() < 0.4) {
              symptomVector[relatedIndex] = 1
            }
          })
        }
      })
      
      // Add some random symptoms (noise) with low probability
      symptoms.forEach((_, index) => {
        if (symptomVector[index] === 0 && Math.random() < 0.05) {
          symptomVector[index] = 1
        }
      })
      
      // Create one-hot encoded disease vector
      const diseaseVector = new Array(diseases.length).fill(0)
      diseaseVector[diseases.indexOf(disease)] = 1
      
      trainingData.push(symptomVector)
      trainingLabels.push(diseaseVector)
    }
    
    return {
      trainingData,
      trainingLabels
    }
  }
  
  // Helper function to get related symptoms
  function getRelatedSymptoms(symptomId) {
    const relationMap = {
      'fever': ['fatigue', 'weakness', 'chills', 'sweating'],
      'headache': ['nausea', 'dizziness', 'sensitivity_to_light'],
      'cough': ['sore_throat', 'chest_pain', 'difficulty_breathing'],
      'nausea': ['vomiting', 'dizziness', 'loss_of_appetite'],
      'fatigue': ['weakness', 'loss_of_appetite', 'insomnia'],
      'anxiety': ['insomnia', 'panic_attacks', 'irritability'],
      'depression': ['insomnia', 'loss_of_appetite', 'fatigue'],
      'joint_pain': ['muscle_pain', 'stiffness', 'swelling'],
      // Add more symptom relationships as needed
    }
    return relationMap[symptomId] || []
  } 