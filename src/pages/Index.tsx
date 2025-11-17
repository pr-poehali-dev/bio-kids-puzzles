import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { biologyLevels } from '@/data/biologyQuestions';

interface Puzzle {
  id: number;
  title: string;
  animal: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  completed: boolean;
  stars: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  emoji: string;
  unlocked: boolean;
  progress: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'puzzles' | 'levels' | 'achievements'>('home');
  
  const puzzles: Puzzle[] = [
    {
      id: 1,
      title: 'Кто где живёт?',
      animal: 'Млекопитающие',
      emoji: '🦁',
      difficulty: 'easy',
      description: 'Сопоставь животных с их местами обитания',
      completed: false,
      stars: 0
    },
    {
      id: 2,
      title: 'Следы животных',
      animal: 'Лесные жители',
      emoji: '🐻',
      difficulty: 'medium',
      description: 'Угадай, кому принадлежат эти следы',
      completed: false,
      stars: 0
    },
    {
      id: 3,
      title: 'Птичий хор',
      animal: 'Птицы',
      emoji: '🦜',
      difficulty: 'easy',
      description: 'Определи птицу по её пению',
      completed: false,
      stars: 0
    },
    {
      id: 4,
      title: 'Подводный мир',
      animal: 'Морские обитатели',
      emoji: '🐠',
      difficulty: 'medium',
      description: 'Узнай морских животных по силуэту',
      completed: false,
      stars: 0
    },
    {
      id: 5,
      title: 'Что они едят?',
      animal: 'Хищники и травоядные',
      emoji: '🦊',
      difficulty: 'hard',
      description: 'Раздели животных на хищников и травоядных',
      completed: false,
      stars: 0
    },
    {
      id: 6,
      title: 'Семейства животных',
      animal: 'Классификация',
      emoji: '🐾',
      difficulty: 'hard',
      description: 'Распредели животных по семействам',
      completed: false,
      stars: 0
    }
  ];

  const achievements: Achievement[] = [
    {
      id: 1,
      title: 'Первые шаги',
      description: 'Решите первую головоломку',
      icon: 'Star',
      emoji: '⭐',
      unlocked: false,
      progress: 0
    },
    {
      id: 2,
      title: 'Знаток млекопитающих',
      description: 'Решите все задачи про млекопитающих',
      icon: 'Award',
      emoji: '🏆',
      unlocked: false,
      progress: 60
    },
    {
      id: 3,
      title: 'Мастер биологии',
      description: 'Получите 3 звезды в 10 головоломках',
      icon: 'Crown',
      emoji: '👑',
      unlocked: false,
      progress: 30
    },
    {
      id: 4,
      title: 'Исследователь природы',
      description: 'Изучите 20 разных видов животных',
      icon: 'Telescope',
      emoji: '🔬',
      unlocked: false,
      progress: 45
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'Легко';
      case 'medium': return 'Средне';
      case 'hard': return 'Сложно';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-4xl">🧬</span>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                БиоЛогика
              </h1>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
                className="hover-scale"
              >
                <Icon name="Home" size={18} />
                <span className="ml-2 hidden sm:inline">Главная</span>
              </Button>
              <Button 
                variant={activeTab === 'puzzles' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('puzzles')}
                className="hover-scale"
              >
                <Icon name="Puzzle" size={18} />
                <span className="ml-2 hidden sm:inline">Головоломки</span>
              </Button>
              <Button 
                variant={activeTab === 'levels' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('levels')}
                className="hover-scale"
              >
                <Icon name="Target" size={18} />
                <span className="ml-2 hidden sm:inline">Уровни</span>
              </Button>
              <Button 
                variant={activeTab === 'achievements' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('achievements')}
                className="hover-scale"
              >
                <Icon name="Trophy" size={18} />
                <span className="ml-2 hidden sm:inline">Достижения</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="text-center py-12 animate-fade-in">
              <div className="text-8xl mb-6 animate-bounce-in">🦁🐻🦜🐠</div>
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Добро пожаловать в БиоЛогику!
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Увлекательные головоломки про животных для детей 1-6 классов. 
                Изучай биологию через игру и открывай удивительный мир природы!
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 hover-scale"
                onClick={() => setActiveTab('puzzles')}
              >
                <Icon name="Play" size={24} />
                <span className="ml-2">Начать игру</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">6 уровней</h3>
                  <p className="text-muted-foreground">От простых к сложным</p>
                </div>
              </Card>
              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold mb-2">Достижения</h3>
                  <p className="text-muted-foreground">Собирай награды</p>
                </div>
              </Card>
              <Card className="p-6 hover-scale cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-center">
                  <div className="text-5xl mb-4">🧠</div>
                  <h3 className="text-xl font-bold mb-2">Обучение</h3>
                  <p className="text-muted-foreground">Учись играя</p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'puzzles' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2">Головоломки</h2>
              <p className="text-muted-foreground text-lg">
                Выбери задание и начни своё приключение в мир биологии
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {puzzles.map((puzzle, index) => (
                <Card 
                  key={puzzle.id} 
                  className="p-6 hover-scale cursor-pointer transition-all hover:shadow-xl animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{puzzle.emoji}</div>
                    <Badge className={getDifficultyColor(puzzle.difficulty)}>
                      {getDifficultyText(puzzle.difficulty)}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{puzzle.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{puzzle.animal}</p>
                  <p className="text-sm mb-4">{puzzle.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className="text-xl">
                          {puzzle.stars >= star ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <Button size="sm" className="hover-scale">
                      <Icon name="Play" size={16} />
                      <span className="ml-2">Играть</span>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'levels' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2">Уровни по биологии</h2>
              <p className="text-muted-foreground text-lg">
                Проходи уровни с вопросами по разным темам биологии
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {biologyLevels.map((level, index) => (
                <Card 
                  key={level.id} 
                  className={`p-6 transition-all animate-scale-in ${
                    level.locked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'hover-scale cursor-pointer hover:shadow-xl'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => !level.locked && navigate(`/level/${level.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">
                      {level.locked ? '🔒' : '📚'}
                    </div>
                    <Badge className={getDifficultyColor(level.difficulty)}>
                      {getDifficultyText(level.difficulty)}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{level.theme}</p>
                  <p className="text-sm mb-4">
                    {level.questions.length} вопросов
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className="text-xl">
                          ☆
                        </span>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      className="hover-scale"
                      disabled={level.locked}
                    >
                      {level.locked ? (
                        <>
                          <Icon name="Lock" size={16} />
                          <span className="ml-2">Заблокировано</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Play" size={16} />
                          <span className="ml-2">Начать</span>
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2">Достижения</h2>
              <p className="text-muted-foreground text-lg">
                Твой прогресс в изучении биологии
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card 
                  key={achievement.id} 
                  className={`p-6 transition-all animate-scale-in ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300' : 'opacity-60'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-5xl ${achievement.unlocked ? 'animate-bounce-in' : ''}`}>
                      {achievement.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{achievement.title}</h3>
                        {achievement.unlocked && (
                          <Badge className="bg-green-500">
                            <Icon name="Check" size={14} />
                            <span className="ml-1">Получено</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Прогресс</span>
                          <span className="font-semibold">{achievement.progress}%</span>
                        </div>
                        <Progress value={achievement.progress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white/90 backdrop-blur-sm mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>🧬 БиоЛогика — изучай биологию через игру! © 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;