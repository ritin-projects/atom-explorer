import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the atomic number of an element?",
    options: [
      "Number of electrons",
      "Number of protons",
      "Number of neutrons", 
      "Number of protons + neutrons"
    ],
    correctAnswer: 1,
    explanation: "The atomic number is the number of protons in the nucleus, which defines the element's identity."
  },
  {
    id: 2,
    question: "How many electrons can the second electron shell hold?",
    options: ["2", "6", "8", "18"],
    correctAnswer: 2,
    explanation: "The second shell (L shell) can hold a maximum of 8 electrons."
  },
  {
    id: 3,
    question: "What makes isotopes of the same element different?",
    options: [
      "Number of protons",
      "Number of electrons",
      "Number of neutrons",
      "Number of shells"
    ],
    correctAnswer: 2,
    explanation: "Isotopes have the same number of protons but different numbers of neutrons."
  }
];

export const InteractiveQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      
      if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 70) return 'text-green-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResult) {
    return (
      <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gradient">Quiz Complete!</h2>
          
          <div className="text-6xl font-bold animate-pulse-glow">
            <span className={getScoreColor()}>
              {score}/{quizQuestions.length}
            </span>
          </div>
          
          <p className="text-xl text-muted-foreground">
            {score === quizQuestions.length 
              ? "Perfect! You're an atomic structure expert!" 
              : score >= quizQuestions.length * 0.7
              ? "Great job! You understand the basics well."
              : "Keep studying - you're getting there!"}
          </p>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = answers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className="p-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{question.question}</p>
                    <Badge className={isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </Badge>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm space-y-1">
                      <p className="text-red-400">Your answer: {question.options[userAnswer]}</p>
                      <p className="text-green-400">Correct answer: {question.options[question.correctAnswer]}</p>
                      <p className="text-muted-foreground">{question.explanation}</p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <Button 
            onClick={resetQuiz}
            className="w-full transition-smooth hover:glow-effect"
          >
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="border-primary text-primary">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
          <div className="text-sm text-muted-foreground">
            Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gradient animate-fade-in">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full text-left justify-start h-auto p-4 transition-smooth hover:glow-effect ${
                selectedAnswer === index ? 'glow-effect' : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span className="mr-3 text-accent font-semibold">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
            </Button>
          ))}
        </div>

        <Button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className="w-full transition-smooth hover:glow-effect"
        >
          {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </div>
    </Card>
  );
};