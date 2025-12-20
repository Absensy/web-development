import { useState, useEffect } from 'react';

/**
 * Хук для определения, является ли фон изображения преимущественно белым
 * @param imageSrc - URL изображения
 * @returns true если большинство пикселей белые/светлые, false если нет
 */
export const useImageBackgroundColor = (imageSrc: string): boolean | null => {
    const [isWhiteBackground, setIsWhiteBackground] = useState<boolean | null>(null);

    useEffect(() => {
        if (!imageSrc) {
            setIsWhiteBackground(null);
            return;
        }

        const analyzeImage = async () => {
            try {
                const img = new Image();
                img.crossOrigin = 'anonymous';

                img.onload = () => {
                    try {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        if (!ctx) {
                            setIsWhiteBackground(false);
                            return;
                        }

                        // Уменьшаем размер для более быстрого анализа
                        const maxSize = 100;
                        const scale = Math.min(maxSize / img.width, maxSize / img.height);
                        canvas.width = img.width * scale;
                        canvas.height = img.height * scale;

                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                        const data = imageData.data;

                        let lightPixels = 0;
                        let totalPixels = 0;

                        // Анализируем пиксели по краям изображения (где обычно фон)
                        const edgeThickness = Math.floor(Math.min(canvas.width, canvas.height) * 0.15);

                        for (let y = 0; y < canvas.height; y++) {
                            for (let x = 0; x < canvas.width; x++) {
                                // Проверяем только края изображения
                                const isEdge = x < edgeThickness ||
                                             x >= canvas.width - edgeThickness ||
                                             y < edgeThickness ||
                                             y >= canvas.height - edgeThickness;

                                if (isEdge) {
                                    const i = (y * canvas.width + x) * 4;
                                    const r = data[i];
                                    const g = data[i + 1];
                                    const b = data[i + 2];
                                    const a = data[i + 3];

                                    // Считаем светлыми пиксели с RGB > 200
                                    if (a > 0 && r > 200 && g > 200 && b > 200) {
                                        lightPixels++;
                                    }
                                    totalPixels++;
                                }
                            }
                        }

                        // Если больше 60% пикселей на краях светлые - считаем фон белым
                        const lightPercentage = totalPixels > 0 ? (lightPixels / totalPixels) : 0;
                        setIsWhiteBackground(lightPercentage > 0.6);
                    } catch (error) {
                        console.error('Error analyzing image:', error);
                        setIsWhiteBackground(false);
                    }
                };

                img.onerror = () => {
                    setIsWhiteBackground(false);
                };

                img.src = imageSrc;
            } catch (error) {
                console.error('Error loading image:', error);
                setIsWhiteBackground(false);
            }
        };

        analyzeImage();
    }, [imageSrc]);

    return isWhiteBackground;
};
