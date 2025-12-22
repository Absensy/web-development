'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Card,
  CardContent,
  Divider,
  Chip,
  SelectChangeEvent
} from '@mui/material';

export default function FormsDemoPage() {
  // ========== ЗАДАНИЕ 1: Получение данных из полей формы ==========
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    country: '',
    newsletter: false,
    terms: false,
    gender: '',
    age: ''
  });

  const [formResult, setFormResult] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, gender: e.target.value }));
  };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData(prev => ({ ...prev, country: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    const data = {
      'Текстовое поле (Имя)': formData.name,
      'Текстовое поле (Email)': formData.email,
      'Текстовое поле (Телефон)': formData.phone,
      'Текстовая область (Сообщение)': formData.message,
      'Список (Страна)': formData.country,
      'Флажок (Рассылка)': formData.newsletter ? 'Да' : 'Нет',
      'Флажок (Согласие)': formData.terms ? 'Да' : 'Нет',
      'Переключатель (Пол)': formData.gender,
      'Переключатель (Возраст)': formData.age
    };

    // Вывод данных в диалоговое окно
    const message = Object.entries(data)
      .map(([key, value]) => `${key}: ${value || '(не указано)'}`)
      .join('\n');
    
    alert('ДАННЫЕ ИЗ ФОРМЫ:\n\n' + message);
    
    // Также выводим на страницу
    setFormResult(message);
  };

  const [validationForm, setValidationForm] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    website: ''
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [validationMethod, setValidationMethod] = useState<'basic' | 'regex' | 'html5'>('basic');

  // Способ 1: Базовые проверки (на пустое, длина, наличие символов)
  const validateBasic = () => {
    const errors: Record<string, string> = {};

    // Проверка на пустое поле
    if (!validationForm.email.trim()) {
      errors.email = 'Email не может быть пустым';
    } else if (validationForm.email.length < 5) {
      errors.email = 'Email слишком короткий (минимум 5 символов)';
    } else if (!validationForm.email.includes('@')) {
      errors.email = 'Email должен содержать символ @';
    } else if (!validationForm.email.includes('.')) {
      errors.email = 'Email должен содержать точку';
    }

    // Проверка телефона
    if (!validationForm.phone.trim()) {
      errors.phone = 'Телефон не может быть пустым';
    } else if (validationForm.phone.length < 10) {
      errors.phone = 'Телефон слишком короткий (минимум 10 символов)';
    } else if (!/^[0-9+\-() ]+$/.test(validationForm.phone)) {
      errors.phone = 'Телефон должен содержать только цифры и символы +, -, (, )';
    }

    // Проверка пароля
    if (!validationForm.password) {
      errors.password = 'Пароль не может быть пустым';
    } else if (validationForm.password.length < 8) {
      errors.password = 'Пароль должен быть не менее 8 символов';
    } else if (!/[A-Z]/.test(validationForm.password)) {
      errors.password = 'Пароль должен содержать хотя бы одну заглавную букву';
    } else if (!/[0-9]/.test(validationForm.password)) {
      errors.password = 'Пароль должен содержать хотя бы одну цифру';
    }

    // Проверка совпадения паролей
    if (validationForm.password !== validationForm.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    return errors;
  };

  // Способ 2: Валидация с регулярными выражениями
  const validateRegex = () => {
    const errors: Record<string, string> = {};

    // Регулярное выражение для email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validationForm.email.trim()) {
      errors.email = 'Email не может быть пустым';
    } else if (!emailRegex.test(validationForm.email)) {
      errors.email = 'Неверный формат email (пример: user@example.com)';
    }

    // Регулярное выражение для телефона (белорусский формат)
    const phoneRegex = /^(\+375|375)?[\s\-]?\(?[0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    if (!validationForm.phone.trim()) {
      errors.phone = 'Телефон не может быть пустым';
    } else if (!phoneRegex.test(validationForm.phone.replace(/\s/g, ''))) {
      errors.phone = 'Неверный формат телефона (пример: +375 (29) 123-45-67)';
    }

    // Регулярное выражение для пароля (минимум 8 символов, заглавная, цифра, спецсимвол)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!validationForm.password) {
      errors.password = 'Пароль не может быть пустым';
    } else if (!passwordRegex.test(validationForm.password)) {
      errors.password = 'Пароль должен быть минимум 8 символов, содержать заглавную букву, цифру и спецсимвол (!@#$%^&*)';
    }

    // Проверка совпадения паролей
    if (validationForm.password !== validationForm.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }

    // Регулярное выражение для URL
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (validationForm.website && !urlRegex.test(validationForm.website)) {
      errors.website = 'Неверный формат URL (пример: https://example.com)';
    }

    return errors;
  };

  // Способ 3: HTML5 валидация
  const validateHTML5 = (formElement: HTMLFormElement) => {
    if (!formElement.checkValidity()) {
      formElement.reportValidity();
      return false;
    }
    return true;
  };

  const handleValidationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let errors: Record<string, string> = {};
    
    if (validationMethod === 'basic') {
      errors = validateBasic();
    } else if (validationMethod === 'regex') {
      errors = validateRegex();
    } else if (validationMethod === 'html5') {
      const form = e.currentTarget as HTMLFormElement;
      if (!validateHTML5(form)) {
        return;
      }
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert('Валидация прошла успешно!');
    }
  };

  // ========== ЗАДАНИЕ 3: Работа с RegExp и регулярными выражениями ==========
  const [regexInput, setRegexInput] = useState('');
  const [regexPattern, setRegexPattern] = useState('');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexResults, setRegexResults] = useState<{
    test: boolean;
    exec: { match: string; index: number; input: string; groups: Record<string, string> | null; allMatches: RegExpExecArray } | null;
    match: RegExpMatchArray | null;
    search: number | null;
    replace: string | null;
    split: string[] | null;
  } | null>(null);

  const testRegExp = () => {
    if (!regexPattern) {
      alert('Введите регулярное выражение');
      return;
    }

    try {
      const regex = new RegExp(regexPattern, regexFlags);
      const results: {
        test: boolean;
        exec: { match: string; index: number; input: string; groups: Record<string, string> | null; allMatches: RegExpExecArray } | null;
        match: RegExpMatchArray | null;
        search: number | null;
        replace: string | null;
        split: string[] | null;
      } = {
        test: regex.test(regexInput),
        exec: null,
        match: null,
        search: null,
        replace: null,
        split: null
      };

      // test() - проверяет наличие совпадения
      results.test = regex.test(regexInput);

      // exec() - возвращает первое совпадение с подробной информацией
      const execResult = regex.exec(regexInput);
      if (execResult) {
        results.exec = {
          match: execResult[0],
          index: execResult.index,
          input: execResult.input,
          groups: execResult.groups || null,
          allMatches: execResult
        };
      }

      // match() - метод String, возвращает все совпадения
      const matchResult = regexInput.match(regex);
      results.match = matchResult;

      // search() - метод String, возвращает индекс первого совпадения
      const searchResult = regexInput.search(regex);
      results.search = searchResult !== -1 ? searchResult : null;

      // replace() - метод String, заменяет совпадения
      results.replace = regexInput.replace(regex, '***ЗАМЕНЕНО***');

      // split() - метод String, разбивает строку по регулярному выражению
      results.split = regexInput.split(regex);

      setRegexResults(results);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Неизвестная ошибка';
      alert('Ошибка в регулярном выражении: ' + errorMessage);
    }
  };

  // Примеры регулярных выражений
  const regexExamples = [
    { name: 'Email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', flags: 'g', description: 'Проверка email адреса' },
    { name: 'Телефон', pattern: '\\+375\\s?[0-9]{2}\\s?[0-9]{3}[\\s-]?[0-9]{2}[\\s-]?[0-9]{2}', flags: 'g', description: 'Белорусский номер телефона' },
    { name: 'IP адрес', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g', description: 'IPv4 адрес' },
    { name: 'Дата', pattern: '\\d{2}\\.\\d{2}\\.\\d{4}', flags: 'g', description: 'Дата в формате ДД.ММ.ГГГГ' },
    { name: 'Цифры', pattern: '\\d+', flags: 'g', description: 'Все цифры в строке' },
    { name: 'Слова', pattern: '\\b\\w+\\b', flags: 'g', description: 'Все слова' },
    { name: 'Пробелы', pattern: '\\s+', flags: 'g', description: 'Все пробелы' }
  ];

  const loadExample = (example: typeof regexExamples[0]) => {
    setRegexPattern(example.pattern);
    setRegexFlags(example.flags);
    setRegexInput('Пример: test@example.com, +375 29 123-45-67, 192.168.1.1, 25.12.2024');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Работа с формами и валидацией
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Демонстрация получения данных из форм, валидации и работы с регулярными выражениями
      </Typography>

      <Stack spacing={4}>
        {/* ЗАДАНИЕ 1: Получение данных из полей формы */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Задание 1: Получение данных из полей пользовательских форм
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Форма содержит: текстовые поля, текстовую область, флажки, переключатели, список
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              {/* Текстовые поля */}
              <TextField
                name="name"
                label="Имя"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                name="phone"
                label="Телефон"
                value={formData.phone}
                onChange={handleInputChange}
                fullWidth
              />

              {/* Текстовая область */}
              <TextField
                name="message"
                label="Сообщение"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                fullWidth
              />

              {/* Список (Select) */}
              <FormControl fullWidth>
                <InputLabel>Страна</InputLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleSelectChange}
                  label="Страна"
                >
                  <MenuItem value="belarus">Беларусь</MenuItem>
                  <MenuItem value="russia">Россия</MenuItem>
                  <MenuItem value="ukraine">Украина</MenuItem>
                  <MenuItem value="poland">Польша</MenuItem>
                </Select>
              </FormControl>

              {/* Флажки (Checkbox) */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Подписаться на рассылку"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={formData.terms}
                    onChange={handleCheckboxChange}
                  />
                }
                label="Согласен с условиями"
              />

              {/* Переключатели (Radio) */}
              <FormControl>
                <FormLabel>Пол</FormLabel>
                <RadioGroup
                  name="gender"
                  value={formData.gender}
                  onChange={handleRadioChange}
                  row
                >
                  <FormControlLabel value="male" control={<Radio />} label="Мужской" />
                  <FormControlLabel value="female" control={<Radio />} label="Женский" />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Возраст</FormLabel>
                <RadioGroup
                  name="age"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  row
                >
                  <FormControlLabel value="18-25" control={<Radio />} label="18-25" />
                  <FormControlLabel value="26-35" control={<Radio />} label="26-35" />
                  <FormControlLabel value="36+" control={<Radio />} label="36+" />
                </RadioGroup>
              </FormControl>

              <Button type="submit" variant="contained" size="large" fullWidth>
                Получить данные из формы
              </Button>
            </Stack>
          </form>

          {formResult && (
            <Card variant="outlined" sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Данные из формы (вывод на страницу):</Typography>
                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-line' }}>
                  {formResult}
                </Box>
              </CardContent>
            </Card>
          )}
        </Paper>

        {/* ЗАДАНИЕ 2: Валидация форм 3 способами */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Задание 2: Валидация пользовательских форм 3 способами
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Выберите способ валидации и попробуйте заполнить форму
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Button
              variant={validationMethod === 'basic' ? 'contained' : 'outlined'}
              onClick={() => setValidationMethod('basic')}
            >
              1. Базовые проверки
            </Button>
            <Button
              variant={validationMethod === 'regex' ? 'contained' : 'outlined'}
              onClick={() => setValidationMethod('regex')}
            >
              2. Регулярные выражения
            </Button>
            <Button
              variant={validationMethod === 'html5' ? 'contained' : 'outlined'}
              onClick={() => setValidationMethod('html5')}
            >
              3. HTML5 валидация
            </Button>
          </Stack>

          <form onSubmit={handleValidationSubmit}>
            <Stack spacing={2}>
              <TextField
                name="email"
                label="Email"
                type={validationMethod === 'html5' ? 'email' : 'text'}
                value={validationForm.email}
                onChange={(e) => setValidationForm(prev => ({ ...prev, email: e.target.value }))}
                fullWidth
                required={validationMethod === 'html5'}
                error={!!validationErrors.email}
                helperText={validationErrors.email}
              />

              <TextField
                name="phone"
                label="Телефон"
                type={validationMethod === 'html5' ? 'tel' : 'text'}
                value={validationForm.phone}
                onChange={(e) => setValidationForm(prev => ({ ...prev, phone: e.target.value }))}
                fullWidth
                required={validationMethod === 'html5'}
                error={!!validationErrors.phone}
                helperText={validationErrors.phone}
                placeholder="+375 (29) 123-45-67"
              />

              <TextField
                name="password"
                label="Пароль"
                type="password"
                value={validationForm.password}
                onChange={(e) => setValidationForm(prev => ({ ...prev, password: e.target.value }))}
                fullWidth
                required={validationMethod === 'html5'}
                error={!!validationErrors.password}
                helperText={validationErrors.password}
                inputProps={{
                  minLength: validationMethod === 'html5' ? 8 : undefined,
                  pattern: validationMethod === 'html5' ? '^(?=.*[A-Z])(?=.*[0-9]).{8,}$' : undefined
                }}
              />

              <TextField
                name="confirmPassword"
                label="Подтверждение пароля"
                type="password"
                value={validationForm.confirmPassword}
                onChange={(e) => setValidationForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                fullWidth
                required={validationMethod === 'html5'}
                error={!!validationErrors.confirmPassword}
                helperText={validationErrors.confirmPassword}
              />

              <TextField
                name="website"
                label="Веб-сайт (необязательно)"
                type={validationMethod === 'html5' ? 'url' : 'text'}
                value={validationForm.website}
                onChange={(e) => setValidationForm(prev => ({ ...prev, website: e.target.value }))}
                fullWidth
                error={!!validationErrors.website}
                helperText={validationErrors.website}
                placeholder="https://example.com"
              />

              <Button type="submit" variant="contained" size="large" fullWidth>
                Проверить валидацию
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Описание способа валидации:
            </Typography>
            {validationMethod === 'basic' && (
              <Typography variant="body2">
                Базовые проверки: на пустое поле, минимальная длина, наличие определенных символов (@, точка для email)
              </Typography>
            )}
            {validationMethod === 'regex' && (
              <Typography variant="body2">
                Регулярные выражения: используются паттерны для проверки формата email, телефона, пароля, URL
              </Typography>
            )}
            {validationMethod === 'html5' && (
              <Typography variant="body2">
                HTML5 валидация: используются встроенные типы полей (email, tel, url) и атрибуты (required, minLength, pattern)
              </Typography>
            )}
          </Box>
        </Paper>

        {/* ЗАДАНИЕ 3: Работа с RegExp */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Задание 3: Работа с объектом RegExp и регулярными выражениями
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Демонстрация методов test(), exec() и методов String: match(), search(), replace(), split()
          </Typography>

          {/* Пример использования */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              Пример работы:
            </Typography>
            <Typography variant="body2" component="div" sx={{ mt: 1 }}>
              <strong>1. Введите текст:</strong> &quot;Мой email: test@example.com, телефон: +375 29 123-45-67, дата: 25.12.2024&quot;<br/>
              <strong>2. Введите регулярное выражение:</strong> <code>\d+</code> (для поиска всех цифр)<br/>
              <strong>3. Установите флаги:</strong> <code>g</code> (глобальный поиск)<br/>
              <strong>4. Нажмите &quot;Применить регулярное выражение&quot;</strong><br/>
              <strong>Результат:</strong> Найдутся все числа: 375, 29, 123, 45, 67, 25, 12, 2024
            </Typography>
          </Alert>

          <Stack spacing={3}>
            <TextField
              label="Введите текст для проверки"
              multiline
              rows={3}
              value={regexInput}
              onChange={(e) => setRegexInput(e.target.value)}
              fullWidth
              placeholder="Введите текст, в котором будет искаться паттерн"
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="Регулярное выражение"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                fullWidth
                placeholder="Например: \\d+ для поиска цифр"
              />
              <TextField
                label="Флаги"
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                sx={{ width: 150 }}
                placeholder="g, i, m"
                helperText="g-глобально, i-без учета регистра, m-многострочный"
              />
            </Stack>

            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="contained" onClick={testRegExp}>
                Применить регулярное выражение
              </Button>
              <Chip label="test()" color="primary" />
              <Chip label="exec()" color="primary" />
              <Chip label="match()" color="primary" />
              <Chip label="search()" color="primary" />
              <Chip label="replace()" color="primary" />
              <Chip label="split()" color="primary" />
            </Stack>

            <Divider />

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Примеры регулярных выражений (нажмите для загрузки):
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {regexExamples.map((example, idx) => (
                  <Chip
                    key={idx}
                    label={example.name}
                    onClick={() => loadExample(example)}
                    sx={{ cursor: 'pointer' }}
                    title={example.description}
                  />
                ))}
              </Stack>
              
              {/* Подробные примеры */}
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                  Подробные примеры использования:
                </Typography>
                <Stack spacing={2} mt={1}>
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Пример 1: Поиск email адресов
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <strong>Текст:</strong> &quot;Свяжитесь: admin@site.com или support@mail.ru&quot;<br/>
                      <strong>Регулярное выражение:</strong> <code>^[^\s@]+@[^\s@]+\.[^\s@]+$</code><br/>
                      <strong>Флаги:</strong> <code>g</code><br/>
                      <strong>Результат:</strong> Найдет &quot;admin@site.com&quot; и &quot;support@mail.ru&quot;
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Пример 2: Поиск телефонных номеров
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <strong>Текст:</strong> &quot;Позвоните: +375 29 123-45-67 или 375291234567&quot;<br/>
                      <strong>Регулярное выражение:</strong> <code>\+375\s?[0-9]{2}\s?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}</code><br/>
                      <strong>Флаги:</strong> <code>g</code><br/>
                      <strong>Результат:</strong> Найдет &quot;+375 29 123-45-67&quot;
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Пример 3: Поиск всех цифр
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <strong>Текст:</strong> &quot;В 2024 году было продано 1234 товара по цене 99.99&quot;<br/>
                      <strong>Регулярное выражение:</strong> <code>\d+</code><br/>
                      <strong>Флаги:</strong> <code>g</code><br/>
                      <strong>Результат:</strong> Найдет все числа: 2024, 1234, 99, 99
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Пример 4: Замена текста
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <strong>Текст:</strong> &quot;Мой пароль: Secret123&quot;<br/>
                      <strong>Регулярное выражение:</strong> <code>Secret\d+</code><br/>
                      <strong>Флаги:</strong> <code>g</code><br/>
                      <strong>Результат replace():</strong> &quot;Мой пароль: ***ЗАМЕНЕНО***&quot;
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" fontWeight="bold" gutterBottom>
                      Пример 5: Разбиение строки
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ pl: 2, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <strong>Текст:</strong> &quot;Яблоко,Груша,Банан,Апельсин&quot;<br/>
                      <strong>Регулярное выражение:</strong> <code>,</code><br/>
                      <strong>Флаги:</strong> <code>g</code><br/>
                      <strong>Результат split():</strong> [&quot;Яблоко&quot;, &quot;Груша&quot;, &quot;Банан&quot;, &quot;Апельсин&quot;]
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {regexResults && (
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Результаты:</Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2">test() - проверка наличия совпадения:</Typography>
                      <Chip
                        label={regexResults.test ? 'Найдено совпадение ✓' : 'Совпадений не найдено ✗'}
                        color={regexResults.test ? 'success' : 'error'}
                      />
                    </Box>

                    {regexResults.exec && (
                      <Box>
                        <Typography variant="subtitle2">exec() - первое совпадение с подробной информацией:</Typography>
                        <Box sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          Совпадение: &quot;{regexResults.exec.match}&quot;<br />
                          Индекс: {regexResults.exec.index}<br />
                          Входная строка: &quot;{regexResults.exec.input}&quot;
                        </Box>
                      </Box>
                    )}

                    {regexResults.match && (
                      <Box>
                        <Typography variant="subtitle2">match() - все совпадения:</Typography>
                        <Box sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          {JSON.stringify(regexResults.match, null, 2)}
                        </Box>
                      </Box>
                    )}

                    {regexResults.search !== null && (
                      <Box>
                        <Typography variant="subtitle2">search() - индекс первого совпадения:</Typography>
                        <Chip label={regexResults.search !== null ? `Индекс: ${regexResults.search}` : 'Не найдено'} />
                      </Box>
                    )}

                    <Box>
                      <Typography variant="subtitle2">replace() - замена совпадений:</Typography>
                      <Box sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                        {regexResults.replace}
                      </Box>
                    </Box>

                    {regexResults.split && (
                      <Box>
                        <Typography variant="subtitle2">split() - разбиение строки по регулярному выражению:</Typography>
                        <Box sx={{ bgcolor: 'grey.50', p: 1, borderRadius: 1, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                          {JSON.stringify(regexResults.split, null, 2)}
                        </Box>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}

