'use client';
import React, { useState, useEffect } from "react";
import Snowfall from "react-snowfall";

export default function SnowWrapper() { 
    const [isSnowSeason, setIsSnowySeason] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const CheckDate = () => {
            const now = new Date();
            const month = now.getMonth();
            const day = now.getDate();

            //Проверка на поздний декабрь
            const isLateDecember = month === 11 && day >= 14;
            const isEarlyJanuary = month === 0;
            const isEarlyFebruary = month === 1 && day <= 14;

            if (isLateDecember || isEarlyJanuary || isEarlyFebruary) {
                setIsSnowySeason(true);
            }
        };
        CheckDate();
    }, []);

    // Не рендерим на сервере, чтобы избежать hydration mismatch
    if (!isMounted) return null;
    if (!isSnowSeason) return null;

    return (
        <Snowfall
            snowflakeCount={100}
            speed={[0.5, 2]}
            wind={[-0.5, 0.5]}
            radius={[0.5, 3]}
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
}

