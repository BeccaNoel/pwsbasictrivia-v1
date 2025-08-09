import React, { useState } from 'react';

const TRANSLATIONS = {
  "en-US": {
    "triviaTitle": "PWS Educational Trivia",
    "triviaSubtitle": "Test your knowledge about Prader-Willi Syndrome",
    "difficultyTitle": "Difficulty Level",
    "numQuestionsTitle": "Number of questions",
    "startGameButton": "Start Learning Quiz",
    "generatingQuestionsTitle": "Preparing your PWS quiz...",
    "generatingQuestionsSubtitle": "Creating educational questions",
    "questionOf": "Question",
    "of": "of",
    "score": "Score:",
    "checkAnswerButton": "Check Answer",
    "nextQuestionButton": "Next Question",
    "finishGameButton": "View Results",
    "resultsTitle": "Quiz Results",
    "correct": "Correct",
    "excellentMessage": "🏆 Excellent Knowledge!",
    "goodJobMessage": "👍 Great Understanding!",
    "notBadMessage": "👌 Good Foundation!",
    "keepLearningMessage": "📚 Keep Learning!",
    "yourAnswer": "Your answer:",
    "correctAnswer": "Correct answer:",
    "playAgainButton": "Take Quiz Again",
    "selectAnswerAlert": "Please select an answer!",
    "generateQuestionsError": "Failed to generate questions. Please try again.",
    "easy": "Basic",
    "medium": "Intermediate",
    "hard": "Advanced"
  }
};

const locale = 'en-US';
const t = (key) => TRANSLATIONS[locale]?.[key] || key;

const PWSTriviaGame = () => {
  const [gameState, setGameState] = useState('setup');
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // Comprehensive PWS question bank based on the PDF documents
  const pwsQuestions = {
    easy: [
      {
        question: "What does PWS stand for?",
        options: ["Prader-Willi Syndrome", "Physical Weakness Syndrome", "Pediatric Weight Syndrome", "Protein Wasting Syndrome"],
        correctAnswer: 0,
        category: "Prader-Willi Syndrome Basics"
      },
      {
        question: "PWS occurs in approximately how many births?",
        options: ["1 in 5,000", "1 in 12,000-15,000", "1 in 50,000", "1 in 100,000"],
        correctAnswer: 1,
        category: "Prevalence"
      },
      {
        question: "What chromosome is affected in PWS?",
        options: ["Chromosome 13", "Chromosome 14", "Chromosome 15", "Chromosome 16"],
        correctAnswer: 2,
        category: "Genetics"
      },
      {
        question: "The major medical concern of PWS is:",
        options: ["Heart problems", "Kidney failure", "Morbid obesity", "Liver disease"],
        correctAnswer: 2,
        category: "Medical Concerns"
      },
      {
        question: "Which part of the brain is affected in PWS?",
        options: ["Cerebellum", "Hypothalamus", "Brain stem", "Frontal lobe"],
        correctAnswer: 1,
        category: "Brain Function"
      },
      {
        question: "PWS affects which populations?",
        options: ["Only males", "Only females", "Both sexes and all races equally", "Only certain ethnic groups"],
        correctAnswer: 2,
        category: "Demographics"
      },
      {
        question: "What is the hallmark symptom of PWS?",
        options: ["Short stature", "Hyperphagia (excessive eating)", "Learning difficulties", "Sleep problems"],
        correctAnswer: 1,
        category: "Symptoms"
      },
      {
        question: "Growth hormone therapy is considered what type of care for PWS?",
        options: ["Optional treatment", "Standard of care", "Experimental only", "Not recommended"],
        correctAnswer: 1,
        category: "Treatment"
      }
    ],
    medium: [
      {
        question: "What percentage of PWS cases are caused by gene deletion?",
        options: ["About 50%", "About 60%", "About 70%", "About 80%"],
        correctAnswer: 2,
        category: "Genetics"
      },
      {
        question: "Uniparental disomy (UPD) occurs in what percentage of PWS cases?",
        options: ["About 15%", "About 25%", "About 35%", "About 45%"],
        correctAnswer: 1,
        category: "Genetics"
      },
      {
        question: "At what age does typical PWS hyperphagia usually begin?",
        options: ["Around 1 year", "Around 2 years", "Around 3 years", "Around 5 years"],
        correctAnswer: 2,
        category: "Development"
      },
      {
        question: "What is gastroparesis?",
        options: ["Fast stomach emptying", "Slow stomach emptying", "Stomach inflammation", "Stomach infection"],
        correctAnswer: 1,
        category: "Medical Issues"
      },
      {
        question: "People with PWS typically have what kind of pain tolerance?",
        options: ["Normal pain tolerance", "Low pain tolerance", "High pain tolerance", "No ability to feel pain"],
        correctAnswer: 2,
        category: "Physical Characteristics"
      },
      {
        question: "How many minutes of daily physical activity are recommended for PWS?",
        options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"],
        correctAnswer: 2,
        category: "Exercise"
      },
      {
        question: "What feeding phase occurs between 20-31 months in PWS?",
        options: ["Decreased appetite", "Normal eating", "Increased weight gain without increased food intake", "Severe hyperphagia"],
        correctAnswer: 2,
        category: "Feeding Phases"
      },
      {
        question: "Which therapy should begin in infancy for PWS?",
        options: ["Only physical therapy", "Only speech therapy", "Oral Motor/Speech Therapy", "Only occupational therapy"],
        correctAnswer: 2,
        category: "Early Intervention"
      }
    ],
    hard: [
      {
        question: "What is the prevalence range for PWS mentioned in the adult fact sheet?",
        options: ["1:10,000 to 1:20,000", "1:15,000 to 1:25,000", "1:20,000 to 1:30,000", "1:25,000 to 1:35,000"],
        correctAnswer: 1,
        category: "Epidemiology"
      },
      {
        question: "Which specialized feeding equipment might be needed for PWS infants?",
        options: ["Standard bottles only", "Habermann feeder or NUK nipple", "Regular sippy cups", "No special equipment needed"],
        correctAnswer: 1,
        category: "Infant Care"
      },
      {
        question: "What medical alert concern is specific to PWS individuals who vomit?",
        options: ["It's completely normal", "May signal a life-threatening problem", "Indicates mild illness only", "Shows good digestive function"],
        correctAnswer: 1,
        category: "Medical Emergency"
      },
      {
        question: "What percentage of PWS cases involve imprinting errors?",
        options: ["1-3%", "2-5%", "5-8%", "8-10%"],
        correctAnswer: 1,
        category: "Genetic Mechanisms"
      },
      {
        question: "Why might fever be absent in PWS individuals with severe illness?",
        options: ["They have stronger immune systems", "Temperature regulation problems", "They don't get infections", "Medications prevent fever"],
        correctAnswer: 1,
        category: "Temperature Regulation"
      },
      {
        question: "What should be avoided when giving medications to PWS individuals?",
        options: ["All medications", "Vitamins only", "Medications causing sleepiness, especially narcotics", "Only pain medications"],
        correctAnswer: 2,
        category: "Medication Safety"
      },
      {
        question: "At what age do hyperphagia symptoms typically level off?",
        options: ["Around age 5", "Around age 6", "Around age 8", "Around age 10"],
        correctAnswer: 2,
        category: "Symptom Progression"
      },
      {
        question: "What is the recommended approach when PWS individuals show oppositional thinking?",
        options: ["Argue until they comply", "Ignore their concerns", "Provide limited, preferred choices", "Force immediate compliance"],
        correctAnswer: 2,
        category: "Behavior Management"
      }
    ]
  };

  const generateQuestions = () => {
    setGameState('loading');
    
    setTimeout(() => {
      const questionBank = pwsQuestions[difficulty];
      const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, numQuestions);
      
      setQuestions(selectedQuestions);
      setGameState('playing');
      setCurrentQuestion(0);
      setScore(0);
      setAnswers([]);
    }, 1500);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) {
      alert(t('selectAnswerAlert'));
      return;
    }

    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, {
      questionIndex: currentQuestion,
      selectedAnswer,
      isCorrect
    }];
    
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameState('results');
    }
  };

  const resetGame = () => {
    setGameState('setup');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswers([]);
    setQuestions([]);
    setShowAnswer(false);
  };

  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mt-8 mb-12">
            <div className="inline-block bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              Info Sharing Series
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-4 text-white leading-tight">
              {t('triviaTitle')}
            </h1>
            <p className="text-xl text-teal-100 font-medium">{t('triviaSubtitle')}</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-800">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-teal-600 flex items-center">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  📚
                </span>
                {t('difficultyTitle')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['easy', 'medium', 'hard'].map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 border-2 ${
                      difficulty === diff
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-400 shadow-lg transform scale-105'
                        : 'bg-teal-50 text-teal-700 border-teal-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {t(diff)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-teal-600 flex items-center">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  🎯
                </span>
                {t('numQuestionsTitle')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[5, 10, 15, 20].map(num => (
                  <button
                    key={num}
                    onClick={() => setNumQuestions(num)}
                    className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 border-2 ${
                      numQuestions === num
                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-400 shadow-lg transform scale-105'
                        : 'bg-teal-50 text-teal-700 border-teal-200 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateQuestions}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {t('startGameButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin w-20 h-20 border-4 border-orange-400 border-t-white rounded-full mx-auto mb-6"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-orange-300 rounded-full mx-auto animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{t('generatingQuestionsTitle')}</h2>
          <p className="text-teal-100 text-lg">{t('generatingQuestionsSubtitle')}</p>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion];
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="text-orange-300 font-bold text-lg bg-white/20 px-4 py-2 rounded-full">
                {t('questionOf')} {currentQuestion + 1} {t('of')} {questions.length}
              </div>
              <div className="text-orange-300 font-bold text-lg bg-white/20 px-4 py-2 rounded-full">
                {t('score')} {score}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-800">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full text-sm font-bold mb-6">
                {question.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-relaxed text-gray-800">{question.question}</h2>
            </div>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => {
                let buttonClass = 'w-full p-5 rounded-2xl font-semibold text-left transition-all duration-300 border-2 ';
                let showIcon = '';
                
                if (showAnswer) {
                  if (index === question.correctAnswer) {
                    buttonClass += 'bg-green-100 text-green-800 border-green-300 shadow-lg';
                    showIcon = '✓';
                  } else if (index === selectedAnswer && index !== question.correctAnswer) {
                    buttonClass += 'bg-red-100 text-red-800 border-red-300 shadow-lg';
                    showIcon = '✗';
                  } else {
                    buttonClass += 'bg-gray-100 text-gray-600 border-gray-200';
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += 'bg-gradient-to-r from-orange-400 to-orange-500 text-white border-orange-400 shadow-lg transform scale-105';
                  } else {
                    buttonClass += 'bg-teal-50 text-teal-700 border-teal-200 hover:border-orange-300 hover:bg-orange-50 hover:transform hover:scale-102';
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => !showAnswer && selectAnswer(index)}
                    disabled={showAnswer}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="font-black mr-4 text-lg">{String.fromCharCode(65 + index)}.</span>
                        <span className="text-lg">{option}</span>
                      </div>
                      {showIcon && (
                        <span className="text-2xl font-bold">
                          {showIcon}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={nextQuestion}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {!showAnswer 
                ? t('checkAnswerButton')
                : currentQuestion + 1 === questions.length 
                ? t('finishGameButton')
                : t('nextQuestionButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'results') {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 text-white p-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-8 text-white">{t('resultsTitle')}</h1>
          
          <div className="bg-white rounded-3xl p-8 shadow-2xl text-gray-800 mb-8">
            <div className="text-6xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-teal-500 to-teal-600 bg-clip-text text-transparent">
                {score}/{questions.length}
              </span>
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-8 text-gray-700">
              {percentage}% {t('correct')}
            </div>
            
            <div className="text-2xl mb-8 p-4 rounded-2xl bg-gradient-to-r from-orange-100 to-orange-200">
              {percentage >= 80 ? t('excellentMessage') : 
               percentage >= 60 ? t('goodJobMessage') : 
               percentage >= 40 ? t('notBadMessage') : t('keepLearningMessage')}
            </div>

            <div className="space-y-4 mb-8 text-left max-h-96 overflow-y-auto">
              {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer && userAnswer.isCorrect;
                return (
                  <div key={index} className={`p-4 rounded-2xl border-2 ${
                    isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
                  }`}>
                    <div className="font-semibold mb-3 text-lg">{question.question}</div>
                    <div className="space-y-2">
                      <div className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {t('yourAnswer')} {question.options[userAnswer.selectedAnswer]}
                      </div>
                      {!isCorrect && (
                        <div className="text-green-700 font-medium">
                          {t('correctAnswer')} {question.options[question.correctAnswer]}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-5 px-8 rounded-2xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {t('playAgainButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default PWSTriviaGame;

