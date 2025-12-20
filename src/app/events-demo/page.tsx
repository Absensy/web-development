'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Stack, 
  Chip, 
  Button,
  TextField,
  Card,
  CardContent,
  Divider
} from '@mui/material';

export default function EventsDemoPage() {
  // Состояния для различных событий
  const [mouseEvents, setMouseEvents] = useState<string[]>([]);
  const [keyboardEvents, setKeyboardEvents] = useState<string[]>([]);
  const [dragState, setDragState] = useState({ isDragging: false, position: { x: 0, y: 0 } });
  const [pointerEvents, setPointerEvents] = useState<string[]>([]);
  const [pageScrollPosition, setPageScrollPosition] = useState(0);
  const [boxScrollPosition, setBoxScrollPosition] = useState(0);
  const [touchEvents, setTouchEvents] = useState<string[]>([]);
  const [timerValue, setTimerValue] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  
  const dragRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // ========== 1. СОБЫТИЯ МЫШИ ==========
  const handleMouseEnter = () => {
    addEvent(mouseEvents, setMouseEvents, 'mouseenter - курсор вошел в элемент');
  };

  const handleMouseLeave = () => {
    addEvent(mouseEvents, setMouseEvents, 'mouseleave - курсор покинул элемент');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    addEvent(mouseEvents, setMouseEvents, `mousemove - X:${e.clientX}, Y:${e.clientY}`);
  };

  const handleMouseDown = () => {
    addEvent(mouseEvents, setMouseEvents, 'mousedown - кнопка мыши нажата');
  };

  const handleMouseUp = () => {
    addEvent(mouseEvents, setMouseEvents, 'mouseup - кнопка мыши отпущена');
  };

  const handleClick = () => {
    addEvent(mouseEvents, setMouseEvents, 'click - клик по элементу');
  };

  const handleDoubleClick = () => {
    addEvent(mouseEvents, setMouseEvents, 'dblclick - двойной клик');
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    addEvent(mouseEvents, setMouseEvents, 'contextmenu - контекстное меню');
  };

  const addEvent = (events: string[], setter: (val: string[]) => void, event: string) => {
    const newEvents = [...events, `${new Date().toLocaleTimeString()}: ${event}`];
    if (newEvents.length > 10) {
      newEvents.shift();
    }
    setter(newEvents);
  };

  // ========== 2. СОБЫТИЯ КЛАВИАТУРЫ ==========
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Игнорируем события в полях ввода
      }
      const event = `keydown - нажата клавиша: ${e.key} (код: ${e.code})`;
      setKeyboardEvents(prev => {
        const newEvents = [...prev, `${new Date().toLocaleTimeString()}: ${event}`];
        return newEvents.slice(-10);
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const event = `keyup - отпущена клавиша: ${e.key}`;
      setKeyboardEvents(prev => {
        const newEvents = [...prev, `${new Date().toLocaleTimeString()}: ${event}`];
        return newEvents.slice(-10);
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    addEvent(keyboardEvents, setKeyboardEvents, `keypress в поле ввода: ${e.key}`);
  };

  // ========== 3. DRAG & DROP СОБЫТИЯ ==========
  const handleDragStart = (e: React.DragEvent) => {
    setDragState({ isDragging: true, position: { x: e.clientX, y: e.clientY } });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', '');
  };

  const handleDrag = (e: React.DragEvent) => {
    if (dragState.isDragging) {
      setDragState(prev => ({ ...prev, position: { x: e.clientX, y: e.clientY } }));
    }
  };

  const handleDragEnd = () => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragState(prev => ({ ...prev, isDragging: false }));
    addEvent(mouseEvents, setMouseEvents, 'drop - элемент перемещен');
  };

  // ========== 4. СОБЫТИЯ УКАЗАТЕЛЯ ==========
  const handlePointerDown = (e: React.PointerEvent) => {
    addEvent(pointerEvents, setPointerEvents, `pointerdown - тип: ${e.pointerType}, ID: ${e.pointerId}`);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    addEvent(pointerEvents, setPointerEvents, `pointermove - X:${e.clientX}, Y:${e.clientY}`);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    addEvent(pointerEvents, setPointerEvents, `pointerup - тип: ${e.pointerType}`);
  };

  const handlePointerEnter = () => {
    addEvent(pointerEvents, setPointerEvents, 'pointerenter - указатель вошел');
  };

  const handlePointerLeave = () => {
    addEvent(pointerEvents, setPointerEvents, 'pointerleave - указатель покинул');
  };

  // ========== 5. СОБЫТИЯ ПОЛОСЫ ПРОКРУТКИ ==========
  useEffect(() => {
    const handleScroll = () => {
      setPageScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Инициализация
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollBoxScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollPercent = Math.round((target.scrollTop / (target.scrollHeight - target.clientHeight)) * 100);
    setBoxScrollPosition(scrollPercent);
  };

  // ========== 6. СОБЫТИЯ СЕНСОРНЫХ ЭКРАНОВ ==========
  const handleTouchStart = (e: React.TouchEvent) => {
    addEvent(touchEvents, setTouchEvents, `touchstart - касаний: ${e.touches.length}`);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    addEvent(touchEvents, setTouchEvents, `touchmove - касаний: ${e.touches.length}`);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    addEvent(touchEvents, setTouchEvents, `touchend - касаний: ${e.touches.length}`);
  };

  const handleTouchCancel = () => {
    addEvent(touchEvents, setTouchEvents, 'touchcancel - касание отменено');
  };

  // ========== 7. СОБЫТИЯ, СВЯЗАННЫЕ С ТАЙМЕРОМ ==========
  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerValue(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning]);

  const handleStartTimer = () => {
    setTimerRunning(true);
  };

  const handleStopTimer = () => {
    setTimerRunning(false);
  };

  const handleResetTimer = () => {
    setTimerValue(0);
    setTimerRunning(false);
  };

  const handleTimeoutDemo = () => {
    setTimeout(() => {
      addEvent(mouseEvents, setMouseEvents, 'setTimeout - выполнен через 2 секунды');
    }, 2000);
    addEvent(mouseEvents, setMouseEvents, 'setTimeout - установлен на 2 секунды');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Демонстрация интерфейсных событий
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Интерактивные примеры для всех типов интерфейсных событий
      </Typography>

      <Stack spacing={4}>
        {/* 1. СОБЫТИЯ МЫШИ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            1. События мыши
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Попробуйте различные действия мышью на элементах ниже
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={handleClick}
              onDoubleClick={handleDoubleClick}
              onContextMenu={handleContextMenu}
            >
              Наведите, кликните, дважды кликните
            </Button>
          </Stack>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Лог событий мыши:</Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto', bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                {mouseEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">События появятся здесь...</Typography>
                ) : (
                  mouseEvents.map((event, idx) => (
                    <Typography key={idx} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {event}
                    </Typography>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Paper>

        {/* 2. СОБЫТИЯ КЛАВИАТУРЫ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            2. События клавиатуры
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Нажмите любую клавишу (не в поле ввода) или введите текст в поле ниже
          </Typography>
          
          <TextField
            fullWidth
            label="Поле для ввода текста"
            placeholder="Введите текст и посмотрите события"
            onKeyPress={handleInputKeyPress}
            sx={{ mb: 2 }}
          />

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Лог событий клавиатуры:</Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto', bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                {keyboardEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">Нажмите любую клавишу...</Typography>
                ) : (
                  keyboardEvents.map((event, idx) => (
                    <Typography key={idx} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {event}
                    </Typography>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Paper>

        {/* 3. DRAG & DROP СОБЫТИЯ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            3. Drag & Drop события
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Перетащите элемент в область назначения
          </Typography>
          
          <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
            <Box
              ref={dragRef}
              draggable
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
                borderRadius: 2,
                userSelect: 'none',
                transform: dragState.isDragging ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.2s',
                '&:active': {
                  cursor: 'grabbing'
                }
              }}
            >
              Перетащи меня
            </Box>

            <Box
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              sx={{
                flex: 1,
                minHeight: 150,
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Область для сброса
              </Typography>
            </Box>
          </Stack>

          <Chip 
            label={dragState.isDragging ? 'Перетаскивание активно' : 'Элемент на месте'} 
            color={dragState.isDragging ? 'primary' : 'default'} 
          />
        </Paper>

        {/* 4. СОБЫТИЯ УКАЗАТЕЛЯ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            4. События указателя
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Работает с мышью, стилусом и сенсорными экранами
          </Typography>
          
          <Box
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            sx={{
              width: '100%',
              minHeight: 150,
              bgcolor: 'primary.light',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              mb: 2
            }}
          >
            <Typography variant="h6" color="white">
              Взаимодействуйте с этой областью
            </Typography>
          </Box>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Лог событий указателя:</Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto', bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                {pointerEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">События появятся здесь...</Typography>
                ) : (
                  pointerEvents.map((event, idx) => (
                    <Typography key={idx} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {event}
                    </Typography>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Paper>

        {/* 5. СОБЫТИЯ ПОЛОСЫ ПРОКРУТКИ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            5. События полосы прокрутки
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Прокрутите страницу или область ниже
          </Typography>
          
          <Chip label={`Позиция прокрутки страницы: ${Math.round(pageScrollPosition)}px`} sx={{ mb: 2 }} />

          <Box
            ref={scrollRef}
            onScroll={handleScrollBoxScroll}
            sx={{
              width: '100%',
              height: 200,
              overflow: 'auto',
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 2,
              bgcolor: 'grey.50',
              mb: 2
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <Box key={i} sx={{ mb: 2, p: 2, bgcolor: 'white', borderRadius: 1 }}>
                <Typography variant="body2">
                  Элемент {i + 1} - прокрутите, чтобы увидеть события
                </Typography>
              </Box>
            ))}
          </Box>

          <Chip 
            label={`Прокрутка области: ${boxScrollPosition}%`} 
            color="primary" 
          />
        </Paper>

        {/* 6. СОБЫТИЯ СЕНСОРНЫХ ЭКРАНОВ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            6. События сенсорных экранов
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            На сенсорном устройстве: коснитесь, проведите пальцем
          </Typography>
          
          <Box
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
            sx={{
              width: '100%',
              minHeight: 150,
              bgcolor: 'secondary.main',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'none',
              mb: 2
            }}
          >
            <Typography variant="h6" color="white">
              Сенсорная область
            </Typography>
          </Box>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Лог событий сенсорного экрана:</Typography>
              <Box sx={{ maxHeight: 200, overflow: 'auto', bgcolor: 'grey.50', p: 1, borderRadius: 1 }}>
                {touchEvents.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    На сенсорном устройстве события появятся здесь...
                  </Typography>
                ) : (
                  touchEvents.map((event, idx) => (
                    <Typography key={idx} variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                      {event}
                    </Typography>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Paper>

        {/* 7. СОБЫТИЯ, СВЯЗАННЫЕ С ТАЙМЕРОМ */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            7. События, связанные с таймером
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Демонстрация setInterval и setTimeout
          </Typography>
          
          <Stack spacing={2} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4">{timerValue}с</Typography>
              <Chip 
                label={timerRunning ? 'Таймер работает' : 'Таймер остановлен'} 
                color={timerRunning ? 'success' : 'default'} 
              />
            </Box>

            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                onClick={handleStartTimer}
                disabled={timerRunning}
              >
                Запустить таймер
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleStopTimer}
                disabled={!timerRunning}
              >
                Остановить
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleResetTimer}
              >
                Сбросить
              </Button>
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={handleTimeoutDemo}
              >
                Демо setTimeout (2 сек)
              </Button>
            </Stack>
          </Stack>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Информация:</Typography>
              <Typography variant="body2">
                • setInterval - запускает функцию через равные промежутки времени
              </Typography>
              <Typography variant="body2">
                • setTimeout - запускает функцию один раз через указанное время
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Таймер использует setInterval для обновления каждую секунду
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </Stack>
    </Box>
  );
}

