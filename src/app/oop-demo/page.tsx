'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Stack, Chip, Card, CardContent } from '@mui/material';
import { BYNPriceFormatter } from '@/lib/utils';
import { Product } from '@/lib/models';


// Абстракция - Базовый класс для игровых объектов
abstract class GameObject {
  protected x: number;
  protected y: number;
  protected speed: number;

  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  abstract update(): void;
  abstract render(ctx: CanvasRenderingContext2D): void;

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
}

// Наследование - Класс игрока
class Player extends GameObject {
  private score: number = 0;
  private color: string = '#4CAF50';

  constructor(x: number, y: number) {
    super(x, y, 5);
  }

  // ИНКАПСУЛЯЦИЯ - Приватные методы и публичные геттеры
  getScore(): number {
    return this.score;
  }

  addScore(points: number): void {
    this.score += points;
  }

  moveLeft(): void {
    this.x = Math.max(0, this.x - this.speed);
  }

  moveRight(maxWidth: number): void {
    this.x = Math.min(maxWidth - 30, this.x + this.speed);
  }

  update(): void {
    // Логика обновления игрока
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 30, 30);
  }
}

// Наследование - Класс врага
class Enemy extends GameObject {
  private color: string = '#F44336';
  private points: number;

  constructor(x: number, y: number, speed: number, points: number = 10) {
    super(x, y, speed);
    this.points = points;
  }

  // Инкапсуляция
  getPoints(): number {
    return this.points;
  }

  update(): void {
    this.y += this.speed;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 20, 20);
  }

  isOffScreen(height: number): boolean {
    return this.y > height;
  }
}

// Полиморфизм - Разные типы врагов
class FastEnemy extends Enemy {
  constructor(x: number, y: number) {
    super(x, y, 3, 20); // Быстрее, больше очков
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#FF9800';
    ctx.beginPath();
    ctx.arc(this.getPosition().x + 10, this.getPosition().y + 10, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

class SlowEnemy extends Enemy {
  constructor(x: number, y: number) {
    super(x, y, 1, 5); // Медленнее, меньше очков
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = '#9C27B0';
    ctx.fillRect(this.getPosition().x, this.getPosition().y, 25, 25);
  }
}

// Интерфейс
interface IGameState {
  isRunning: boolean;
  isPaused: boolean;
  gameOver: boolean;
}

// Класс игры 
class Game {
  // ИНКАПСУЛЯЦИЯ: 
  private player: Player; 
  private enemies: Enemy[] = [];  
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: IGameState = { 
    isRunning: false,
    isPaused: false,
    gameOver: false
  };
  private lastEnemySpawn: number = 0;  // ИНКАПСУЛЯЦИЯ: Внутреннее состояние
  private animationId: number | null = null;  // ИНКАПСУЛЯЦИЯ: Внутреннее состояние

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    this.ctx = ctx;
    
    // НАСЛЕДОВАНИЕ: Создаем объект Player, который наследуется от GameObject
    this.player = new Player(canvas.width / 2 - 15, canvas.height - 50);
    this.setupCanvas();
  }

  // ИНКАПСУЛЯЦИЯ: Приватный метод - скрывает детали настройки
  private setupCanvas(): void {
    this.canvas.width = 600;
    this.canvas.height = 400;
  }

  // ИНКАПСУЛЯЦИЯ: Публичный метод для управления игрой
  start(): void {
    this.state.isRunning = true;
    this.state.gameOver = false;
    this.enemies = [];
    // НАСЛЕДОВАНИЕ: Создаем новый объект Player (наследуется от GameObject)
    this.player = new Player(this.canvas.width / 2 - 15, this.canvas.height - 50);
    this.gameLoop();
  }

  // ИНКАПСУЛЯЦИЯ: Публичный метод для управления состоянием
  pause(): void {
    this.state.isPaused = !this.state.isPaused;
    if (!this.state.isPaused) {
      this.gameLoop();
    }
  }

  // ИНКАПСУЛЯЦИЯ: Публичный метод для управления игрой
  stop(): void {
    this.state.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }


  // НАСЛЕДОВАНИЕ: Использует методы класса Player (который наследуется от GameObject)
  movePlayer(direction: 'left' | 'right'): void {
    if (!this.state.isRunning || this.state.isPaused) return;
    
    if (direction === 'left') {
      this.player.moveLeft();  
    } else {
      this.player.moveRight(this.canvas.width);  
    }
  }

  getScore(): number {
    return this.player.getScore();  
  }


  getState(): IGameState {
    return { ...this.state };  
  }

  // ПОЛИМОРФИЗМ: Создаем разные типы врагов (Enemy, FastEnemy, SlowEnemy)
  private spawnEnemy(): void {
    const now = Date.now();
    if (now - this.lastEnemySpawn < 1000) return; // Спавн каждую секунду

    const x = Math.random() * (this.canvas.width - 30);
    const type = Math.random();
    

    let enemy: Enemy;  
    if (type < 0.3) {
      enemy = new FastEnemy(x, 0); 
    } else if (type < 0.6) {
      enemy = new SlowEnemy(x, 0); 
    } else {
      enemy = new Enemy(x, 0, 2); 
    }
    
    this.enemies.push(enemy);
    this.lastEnemySpawn = now;
  }


  private checkCollisions(): void {
    const playerPos = this.player.getPosition();  // ИНКАПСУЛЯЦИЯ: Используем геттер
    
    this.enemies = this.enemies.filter(enemy => {
      const enemyPos = enemy.getPosition();  // ПОЛИМОРФИЗМ: Все враги имеют метод getPosition()
      
      // Проверка столкновения
      if (
        playerPos.x < enemyPos.x + 20 &&
        playerPos.x + 30 > enemyPos.x &&
        playerPos.y < enemyPos.y + 20 &&
        playerPos.y + 30 > enemyPos.y
      ) {
        this.state.gameOver = true;
        this.state.isRunning = false;
        return false;
      }
      
      if (enemy.isOffScreen(this.canvas.height)) {
        // ПОЛИМОРФИЗМ: Вызываем getPoints() - каждый тип врага возвращает свои очки
        this.player.addScore(enemy.getPoints());  // ИНКАПСУЛЯЦИЯ: Используем метод Player
        return false;
      }
      
      return true;
    });
  }

  private update(): void {
    if (!this.state.isRunning || this.state.isPaused) return;


    this.enemies.forEach(enemy => enemy.update());  // ПОЛИМОРФИЗМ: Разные реализации update()
    
    this.spawnEnemy();
    this.checkCollisions();
  }

  private render(): void {
    // Очистка canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.player.render(this.ctx);  
    

    this.enemies.forEach(enemy => enemy.render(this.ctx));  
    
    // Рендерим счет
    this.ctx.fillStyle = '#000';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Счет: ${this.player.getScore()}`, 10, 30); 
  }

  private gameLoop = (): void => {
    if (!this.state.isRunning) return;
    
    this.update(); 
    this.render(); 
    
    if (!this.state.isPaused) {
      this.animationId = requestAnimationFrame(this.gameLoop); 
    }
  };
}

export default function OOPDemoPage() {
  const [game, setGame] = useState<Game | null>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<IGameState>({
    isRunning: false,
    isPaused: false,
    gameOver: false
  });
  const [products, setProducts] = useState<any[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Инициализация игры
  useEffect(() => {
    if (canvasRef.current && !game) {
      const newGame = new Game(canvasRef.current);
      setGame(newGame);
    }
  }, [game]);

  // Обновление счета
  useEffect(() => {
    if (!game) return;
    
    const interval = setInterval(() => {
      setScore(game.getScore());
      setGameState(game.getState());
    }, 100);

    return () => clearInterval(interval);
  }, [game]);

  // Обработка клавиатуры
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!game) return;
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        game.movePlayer('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        game.movePlayer('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [game]);

  // Загрузка продуктов (пример использования ООП классов из проекта)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Загружаем данные через API (так как Prisma работает только на сервере)
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Не удалось загрузить продукты');
        }
        const productsData = await response.json();
        
        // Преобразуем данные в объекты Product (демонстрация ООП)
        const productsList = productsData
          .slice(0, 3) // Показываем только 3
          .map((data: any) => new Product(data));
        
        setProducts(productsList);
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
        // В случае ошибки можно показать сообщение пользователю
      }
    };
    loadProducts();
  }, []);

  const handleStart = () => {
    game?.start();
  };

  const handlePause = () => {
    game?.pause();
  };

  const handleStop = () => {
    game?.stop();
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Демонстрация принципов ООП
      </Typography>

      <Stack spacing={3} mt={3}>
        {/* Игра */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Браузерная игра (демонстрация ООП)
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Используйте стрелки ← → или A/D для управления
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Избегайте красных врагов! Оранжевые дают больше очков, фиолетовые - меньше.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} mb={2}>
            <Button variant="contained" onClick={handleStart} disabled={gameState.isRunning}>
              Старт
            </Button>
            <Button variant="outlined" onClick={handlePause} disabled={!gameState.isRunning}>
              {gameState.isPaused ? 'Продолжить' : 'Пауза'}
            </Button>
            <Button variant="outlined" color="error" onClick={handleStop}>
              Стоп
            </Button>
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <canvas
              ref={canvasRef}
              style={{
                border: '2px solid #1976d2',
                borderRadius: '8px',
                backgroundColor: '#f5f5f5'
              }}
            />
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={`Счет: ${score}`} color="primary" />
            <Chip 
              label={gameState.gameOver ? 'Игра окончена!' : gameState.isPaused ? 'Пауза' : gameState.isRunning ? 'Игра идет' : 'Не запущена'} 
              color={gameState.gameOver ? 'error' : gameState.isRunning ? 'success' : 'default'} 
            />
          </Stack>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Принципы ООП в игре:
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                • <strong>Абстракция</strong>: Базовый класс <code>GameObject</code> с абстрактными методами
              </Typography>
              <Typography variant="body2">
                • <strong>Наследование</strong>: <code>Player</code> и <code>Enemy</code> наследуются от <code>GameObject</code>
              </Typography>
              <Typography variant="body2">
                • <strong>Инкапсуляция</strong>: Приватные поля, геттеры/сеттеры в классах
              </Typography>
              <Typography variant="body2">
                • <strong>Полиморфизм</strong>: <code>FastEnemy</code> и <code>SlowEnemy</code> - разные реализации <code>Enemy</code>
              </Typography>
            </Stack>
          </Box>
        </Paper>

        {/* Пример использования классов проекта */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Пример использования ООП классов проекта
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Демонстрация использования классов <code>ProductService</code>, <code>Product</code> и <code>BYNPriceFormatter</code> из проекта
          </Typography>
          
          {products.length > 0 ? (
            <Stack spacing={2} mt={2}>
              {products.map((product) => {
                const formatter = new BYNPriceFormatter();
                const discountInfo = product.getDiscountInfo();
                
                return (
                  <Card key={product.getId()} sx={{ border: '1px solid #e0e0e0' }}>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <Box flex={1}>
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                              {product.getName()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              ID: {product.getId()}
                            </Typography>
                            {product.isOnSale() && (
                              <Chip 
                                label={`Скидка ${discountInfo.discountPercent}%`} 
                                color="error" 
                                size="small"
                                sx={{ mb: 1 }}
                              />
                            )}
                          </Box>
                        </Stack>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1, borderTop: '1px solid #f0f0f0' }}>
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Оригинальная цена:
                            </Typography>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                textDecoration: discountInfo.hasDiscount ? 'line-through' : 'none',
                                color: discountInfo.hasDiscount ? 'text.secondary' : 'text.primary'
                              }}
                            >
                              {formatter.format(product.getPrice())}
                            </Typography>
                          </Box>
                          <Box textAlign="right">
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Финальная цена:
                            </Typography>
                            <Typography variant="h6" color="primary" fontWeight="bold">
                              {formatter.format(product.calculateFinalPrice())}
                            </Typography>
                            {discountInfo.hasDiscount && (
                              <Typography variant="caption" color="error">
                                Экономия: {formatter.format(discountInfo.originalPrice - discountInfo.finalPrice)}
                              </Typography>
                            )}
                          </Box>
                        </Stack>

                        <Box sx={{ mt: 1, p: 1.5, bgcolor: 'info.light', borderRadius: 1 }}>
                          <Typography variant="caption" component="div" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            <strong>Используемые методы:</strong><br/>
                            • product.getName() → "{product.getName()}"<br/>
                            • product.getPrice() → {product.getPrice()}<br/>
                            • product.isOnSale() → {product.isOnSale() ? 'true' : 'false'}<br/>
                            • product.calculateFinalPrice() → {product.calculateFinalPrice()}<br/>
                            • product.getDiscountInfo() → {JSON.stringify(discountInfo)}<br/>
                            • formatter.format(price) → "{formatter.format(product.calculateFinalPrice())}"
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Загрузка продуктов...
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Используемые ООП классы проекта:
            </Typography>
            <Stack spacing={2} mt={2}>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  1. <code>Product</code> (Модель данных)
                </Typography>
                <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                  • <strong>Наследование:</strong> Наследуется от <code>BaseEntity</code><br/>
                  • <strong>Инкапсуляция:</strong> Приватные поля, публичные геттеры/сеттеры<br/>
                  • <strong>Полиморфизм:</strong> Реализует абстрактные методы <code>validate()</code> и <code>toJSON()</code><br/>
                  • <strong>Использование:</strong> Данные загружаются через API <code>/api/products</code>, затем преобразуются в объекты <code>Product</code><br/>
                  • <strong>Методы:</strong> <code>getName()</code>, <code>getPrice()</code>, <code>isOnSale()</code>, <code>calculateFinalPrice()</code>, <code>getDiscountInfo()</code>
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  2. <code>BYNPriceFormatter</code> (Утилитный класс)
                </Typography>
                <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                  • <strong>Наследование:</strong> Наследуется от абстрактного класса <code>PriceFormatter</code><br/>
                  • <strong>Полиморфизм:</strong> Реализует абстрактный метод <code>format()</code><br/>
                  • <strong>Методы:</strong> <code>format(price)</code>, <code>formatWithDiscount(original, discounted)</code>
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  Примечание:
                </Typography>
                <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                  В клиентском компоненте (<code>"use client"</code>) нельзя напрямую использовать <code>ProductService</code> с Prisma, 
                  так как Prisma работает только на сервере. Поэтому данные загружаются через API route <code>/api/products</code>, 
                  а затем преобразуются в объекты класса <code>Product</code> для демонстрации ООП принципов.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Paper>

        {/* Код примеров */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Примеры кода
          </Typography>
          
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.900', borderRadius: 1, overflow: 'auto' }}>
            <pre style={{ color: '#fff', margin: 0, fontSize: '12px' }}>
{`// 1. АБСТРАКЦИЯ - Базовый класс
abstract class GameObject {
  protected x: number;
  protected y: number;
  
  abstract update(): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}

// 2. НАСЛЕДОВАНИЕ
class Player extends GameObject {
  private score: number = 0;
  
  getScore(): number {
    return this.score; // ИНКАПСУЛЯЦИЯ
  }
  
  update(): void { /* логика */ }
  render(ctx: CanvasRenderingContext2D): void { /* отрисовка */ }
}

// 3. ПОЛИМОРФИЗМ - разные реализации
class FastEnemy extends Enemy {
  render(ctx: CanvasRenderingContext2D): void {
    // Своя реализация отрисовки
  }
}

// 4. Использование классов проекта
const productService = new ProductService();
const products = await productService.getAll();
const formatter = new BYNPriceFormatter();
const price = formatter.format(product.getPrice());`}
            </pre>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}

