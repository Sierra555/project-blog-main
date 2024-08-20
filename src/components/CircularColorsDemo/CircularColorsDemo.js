'use client'
import React from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  RotateCcw,
} from 'react-feather';
import { motion } from 'framer-motion';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const id = React.useId();

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  React.useEffect(() => {
    if (!isRunning) return;

    const timeElapsedInterval = window.setInterval(() => setTimeElapsed((currentValue) => currentValue + 1), 1000);
    
    return (() => window.clearInterval(timeElapsedInterval));
  }, [isRunning, timeElapsed]);

  const handlePlay = () => {
    setIsRunning(!isRunning);
    setTimeElapsed(timeElapsed + 1)
  };

  const handleReset = () => {
    setTimeElapsed(0);
    setIsRunning(false);
  };

  return (
    <Card as="section" className={styles.wrapper}>
      <ul 
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 40,
      }} 
      className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected =
            color.value === selectedColor.value;

          return (
            <li
              className={styles.color}
              key={index}
            >
              {isSelected && (
                <motion.div
                  layoutId={`selected-color-outline-${id}`}
                  className={
                    styles.selectedColorOutline
                  }
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected &&
                    styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>
                  {color.label}
                </VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={handlePlay}>
            {isRunning ? <Pause /> : <Play />}
            <VisuallyHidden>{isRunning ? 'Pause' : 'Play'}</VisuallyHidden>
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
