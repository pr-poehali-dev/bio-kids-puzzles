import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { biologyLevels, Question } from '@/data/biologyQuestions';
import { useToast } from '@/hooks/use-toast';

const LevelPage = () => {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const level = biologyLevels.find(l => l.id === Number(levelId));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!level || level.locked) {
      navigate('/');
    }
  }, [level, navigate]);

  if (!level) return null;

  const currentQuestion: Question = level.questions[currentQuestionIndex];
  const progress = (answeredQuestions.size / level.questions.length) * 100;
  const stars = Math.floor((correctAnswers / level.questions.length) * 3);

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions.has(currentQuestionIndex)) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      toast({
        title: "Правильно! 🎉",
        description: "Отличная работа!",
      });
    } else {
      toast({
        title: "Неправильно 😔",
        description: "Не переживай, попробуй еще раз!",
        variant: "destructive"
      });
    }
    
    setAnsweredQuestions(prev => new Set([...prev, currentQuestionIndex]));
  };

  const handleNext = () => {
    if (currentQuestionIndex < level.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setAnsweredQuestions(new Set());
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bio-primary via-bio-secondary to-bio-accent flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 text-center space-y-6 animate-fade-in">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-bio-primary">Уровень завершен!</h1>
          <p className="text-xl text-gray-600">
            Правильных ответов: {correctAnswers} из {level.questions.length}
          </p>
          
          <div className="flex justify-center gap-2 text-4xl">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {i < stars ? '⭐' : '☆'}
              </span>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={handleRestart} 
              className="w-full bg-bio-secondary hover:bg-bio-secondary/90"
            >
              <Icon name="RotateCcw" className="mr-2" />
              Пройти еще раз
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline"
              className="w-full"
            >
              <Icon name="Home" className="mr-2" />
              Вернуться к уровням
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bio-primary via-bio-secondary to-bio-accent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="bg-white/90 hover:bg-white"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              Назад
            </Button>
            <div className="text-white font-semibold">
              Вопрос {currentQuestionIndex + 1} / {level.questions.length}
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-3" />
            <p className="text-white text-sm text-center">
              Правильно: {correctAnswers} | Прогресс: {answeredQuestions.size}/{level.questions.length}
            </p>
          </div>

          <Card className="p-8 space-y-6 animate-fade-in">
            <div className="space-y-2">
              <div className="inline-block px-3 py-1 bg-bio-primary/10 text-bio-primary rounded-full text-sm font-medium">
                {level.theme}
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = showExplanation;
                
                let buttonClass = "w-full justify-start text-left h-auto py-4 px-6 ";
                
                if (showResult) {
                  if (isCorrect) {
                    buttonClass += "bg-green-100 border-green-500 text-green-700 hover:bg-green-100";
                  } else if (isSelected && !isCorrect) {
                    buttonClass += "bg-red-100 border-red-500 text-red-700 hover:bg-red-100";
                  } else {
                    buttonClass += "opacity-50";
                  }
                } else {
                  buttonClass += "hover:bg-bio-primary/10 hover:border-bio-primary";
                }

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answeredQuestions.has(currentQuestionIndex)}
                  >
                    <span className="flex items-center gap-3 w-full">
                      <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && (
                        <Icon name="Check" className="text-green-600" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <Icon name="X" className="text-red-600" />
                      )}
                    </span>
                  </Button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded animate-fade-in">
                <div className="flex gap-3">
                  <Icon name="Info" className="text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Объяснение:</h3>
                    <p className="text-blue-800">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {showExplanation && (
              <Button 
                onClick={handleNext}
                className="w-full bg-bio-secondary hover:bg-bio-secondary/90 text-white py-6 text-lg"
              >
                {currentQuestionIndex < level.questions.length - 1 ? (
                  <>
                    Следующий вопрос
                    <Icon name="ArrowRight" className="ml-2" />
                  </>
                ) : (
                  <>
                    Завершить уровень
                    <Icon name="Check" className="ml-2" />
                  </>
                )}
              </Button>
            )}
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default LevelPage;
