const SPECIALTIES_DATA = {
  "Family Medicine": {
    "id": "family_medicine", "competitivenessLevel": "low", "imgFriendly": true,
    "step1Min": 200, "step1Avg": 220, "step1Top": 240, "step1PassFailAccepted": true,
    "step2Min": 215, "step2Avg": 233, "step2Top": 255,
    "researchAvg": 1, "researchTop": 5, "presentationsAvg": 1, "presentationsTop": 4,
    "rotationsAvg": 1, "rotationsTop": 3, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.60,
    "weights": { "step1": 0.08, "step2": 0.18, "research": 0.07, "presentations": 0.04, "rotations": 0.22, "lors": 0.24, "experience": 0.10, "imgType": 0.07 },
    "medianMatchedStep2IMG": 233, "medianMatchedStep2USSenior": 240
  },
  "Internal Medicine": {
    "id": "internal_medicine", "competitivenessLevel": "moderate", "imgFriendly": true,
    "step1Min": 210, "step1Avg": 233, "step1Top": 255, "step1PassFailAccepted": true,
    "step2Min": 220, "step2Avg": 243, "step2Top": 265,
    "researchAvg": 2, "researchTop": 8, "presentationsAvg": 2, "presentationsTop": 6,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.55,
    "weights": { "step1": 0.12, "step2": 0.20, "research": 0.12, "presentations": 0.07, "rotations": 0.18, "lors": 0.18, "experience": 0.08, "imgType": 0.05 },
    "medianMatchedStep2IMG": 243, "medianMatchedStep2USSenior": 250
  },
  "Pediatrics": {
    "id": "pediatrics", "competitivenessLevel": "moderate", "imgFriendly": true,
    "step1Min": 210, "step1Avg": 232, "step1Top": 255, "step1PassFailAccepted": true,
    "step2Min": 220, "step2Avg": 243, "step2Top": 265,
    "researchAvg": 2, "researchTop": 7, "presentationsAvg": 2, "presentationsTop": 5,
    "rotationsAvg": 1, "rotationsTop": 3, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.50,
    "weights": { "step1": 0.10, "step2": 0.18, "research": 0.12, "presentations": 0.07, "rotations": 0.18, "lors": 0.22, "experience": 0.08, "imgType": 0.05 },
    "medianMatchedStep2IMG": 243, "medianMatchedStep2USSenior": 248
  },
  "Psychiatry": {
    "id": "psychiatry", "competitivenessLevel": "moderate", "imgFriendly": true,
    "step1Min": 205, "step1Avg": 228, "step1Top": 250, "step1PassFailAccepted": true,
    "step2Min": 215, "step2Avg": 236, "step2Top": 258,
    "researchAvg": 2, "researchTop": 7, "presentationsAvg": 2, "presentationsTop": 5,
    "rotationsAvg": 1, "rotationsTop": 3, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.52,
    "weights": { "step1": 0.10, "step2": 0.16, "research": 0.13, "presentations": 0.08, "rotations": 0.18, "lors": 0.22, "experience": 0.08, "imgType": 0.05 },
    "medianMatchedStep2IMG": 236, "medianMatchedStep2USSenior": 244
  },
  "Emergency Medicine": {
    "id": "emergency_medicine", "competitivenessLevel": "high", "imgFriendly": false,
    "step1Min": 225, "step1Avg": 247, "step1Top": 265, "step1PassFailAccepted": false,
    "step2Min": 235, "step2Avg": 258, "step2Top": 272,
    "researchAvg": 2, "researchTop": 7, "presentationsAvg": 2, "presentationsTop": 6,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 2, "experienceTop": 5, "imgMatchRate": 0.22,
    "weights": { "step1": 0.18, "step2": 0.22, "research": 0.10, "presentations": 0.06, "rotations": 0.18, "lors": 0.14, "experience": 0.07, "imgType": 0.05 },
    "medianMatchedStep2IMG": 258, "medianMatchedStep2USSenior": 262
  },
  "General Surgery": {
    "id": "general_surgery", "competitivenessLevel": "high", "imgFriendly": false,
    "step1Min": 225, "step1Avg": 247, "step1Top": 265, "step1PassFailAccepted": false,
    "step2Min": 235, "step2Avg": 249, "step2Top": 268,
    "researchAvg": 3, "researchTop": 10, "presentationsAvg": 3, "presentationsTop": 8,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 2, "experienceTop": 5, "imgMatchRate": 0.20,
    "weights": { "step1": 0.20, "step2": 0.20, "research": 0.15, "presentations": 0.08, "rotations": 0.15, "lors": 0.12, "experience": 0.06, "imgType": 0.04 },
    "medianMatchedStep2IMG": 249, "medianMatchedStep2USSenior": 255
  },
  "OB/GYN": {
    "id": "obgyn", "competitivenessLevel": "high", "imgFriendly": false,
    "step1Min": 220, "step1Avg": 242, "step1Top": 260, "step1PassFailAccepted": false,
    "step2Min": 230, "step2Avg": 249, "step2Top": 268,
    "researchAvg": 2, "researchTop": 8, "presentationsAvg": 2, "presentationsTop": 6,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.22,
    "weights": { "step1": 0.18, "step2": 0.20, "research": 0.13, "presentations": 0.07, "rotations": 0.17, "lors": 0.14, "experience": 0.06, "imgType": 0.05 },
    "medianMatchedStep2IMG": 249, "medianMatchedStep2USSenior": 254
  },
  "Anesthesiology": {
    "id": "anesthesiology", "competitivenessLevel": "moderate", "imgFriendly": true,
    "step1Min": 218, "step1Avg": 240, "step1Top": 260, "step1PassFailAccepted": false,
    "step2Min": 228, "step2Avg": 248, "step2Top": 268,
    "researchAvg": 2, "researchTop": 7, "presentationsAvg": 2, "presentationsTop": 5,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.40,
    "weights": { "step1": 0.18, "step2": 0.22, "research": 0.10, "presentations": 0.06, "rotations": 0.17, "lors": 0.16, "experience": 0.06, "imgType": 0.05 },
    "medianMatchedStep2IMG": 248, "medianMatchedStep2USSenior": 254
  },
  "Radiology": {
    "id": "radiology", "competitivenessLevel": "high", "imgFriendly": false,
    "step1Min": 235, "step1Avg": 248, "step1Top": 265, "step1PassFailAccepted": false,
    "step2Min": 240, "step2Avg": 254, "step2Top": 270,
    "researchAvg": 3, "researchTop": 10, "presentationsAvg": 3, "presentationsTop": 8,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.18,
    "weights": { "step1": 0.25, "step2": 0.25, "research": 0.15, "presentations": 0.08, "rotations": 0.10, "lors": 0.10, "experience": 0.04, "imgType": 0.03 },
    "medianMatchedStep2IMG": 254, "medianMatchedStep2USSenior": 258
  },
  "Pathology": {
    "id": "pathology", "competitivenessLevel": "low", "imgFriendly": true,
    "step1Min": 210, "step1Avg": 233, "step1Top": 255, "step1PassFailAccepted": true,
    "step2Min": 218, "step2Avg": 245, "step2Top": 265,
    "researchAvg": 3, "researchTop": 10, "presentationsAvg": 3, "presentationsTop": 8,
    "rotationsAvg": 1, "rotationsTop": 3, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.55,
    "weights": { "step1": 0.15, "step2": 0.18, "research": 0.20, "presentations": 0.10, "rotations": 0.12, "lors": 0.14, "experience": 0.06, "imgType": 0.05 },
    "medianMatchedStep2IMG": 245, "medianMatchedStep2USSenior": 250
  },
  "Neurology": {
    "id": "neurology", "competitivenessLevel": "moderate", "imgFriendly": true,
    "step1Min": 215, "step1Avg": 238, "step1Top": 260, "step1PassFailAccepted": true,
    "step2Min": 225, "step2Avg": 244, "step2Top": 265,
    "researchAvg": 3, "researchTop": 10, "presentationsAvg": 3, "presentationsTop": 8,
    "rotationsAvg": 2, "rotationsTop": 4, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.48,
    "weights": { "step1": 0.15, "step2": 0.18, "research": 0.17, "presentations": 0.09, "rotations": 0.15, "lors": 0.15, "experience": 0.06, "imgType": 0.05 },
    "medianMatchedStep2IMG": 244, "medianMatchedStep2USSenior": 251
  },
  "Physical Medicine & Rehabilitation": {
    "id": "pmr", "competitivenessLevel": "low", "imgFriendly": true,
    "step1Min": 205, "step1Avg": 228, "step1Top": 250, "step1PassFailAccepted": true,
    "step2Min": 215, "step2Avg": 244, "step2Top": 262,
    "researchAvg": 2, "researchTop": 7, "presentationsAvg": 2, "presentationsTop": 5,
    "rotationsAvg": 1, "rotationsTop": 3, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 1, "experienceTop": 4, "imgMatchRate": 0.58,
    "weights": { "step1": 0.08, "step2": 0.18, "research": 0.12, "presentations": 0.07, "rotations": 0.18, "lors": 0.22, "experience": 0.10, "imgType": 0.05 },
    "medianMatchedStep2IMG": 244, "medianMatchedStep2USSenior": 248
  },
  "Dermatology": {
    "id": "dermatology", "competitivenessLevel": "very_high", "imgFriendly": false,
    "step1Min": 245, "step1Avg": 258, "step1Top": 275, "step1PassFailAccepted": false,
    "step2Min": 248, "step2Avg": 262, "step2Top": 278,
    "researchAvg": 5, "researchTop": 15, "presentationsAvg": 4, "presentationsTop": 12,
    "rotationsAvg": 2, "rotationsTop": 5, "lorsAvg": 4, "lorsTop": 4,
    "experienceAvg": 2, "experienceTop": 5, "imgMatchRate": 0.08,
    "weights": { "step1": 0.25, "step2": 0.22, "research": 0.20, "presentations": 0.10, "rotations": 0.10, "lors": 0.08, "experience": 0.03, "imgType": 0.02 },
    "medianMatchedStep2IMG": 262, "medianMatchedStep2USSenior": 266
  },
  "Orthopedic Surgery": {
    "id": "ortho_surgery", "competitivenessLevel": "very_high", "imgFriendly": false,
    "step1Min": 235, "step1Avg": 252, "step1Top": 270, "step1PassFailAccepted": false,
    "step2Min": 240, "step2Avg": 258, "step2Top": 274,
    "researchAvg": 4, "researchTop": 12, "presentationsAvg": 4, "presentationsTop": 10,
    "rotationsAvg": 2, "rotationsTop": 5, "lorsAvg": 3, "lorsTop": 4,
    "experienceAvg": 2, "experienceTop": 5, "imgMatchRate": 0.10,
    "weights": { "step1": 0.22, "step2": 0.22, "research": 0.18, "presentations": 0.10, "rotations": 0.13, "lors": 0.10, "experience": 0.03, "imgType": 0.02 },
    "medianMatchedStep2IMG": 258, "medianMatchedStep2USSenior": 262
  }
};
