import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';

// Create a custom motion component with Chakra UI's Box
const MotionBox = motion(Box);

interface MotionBoxProps extends BoxProps, Omit<MotionProps, 'transition'> {
  children: React.ReactNode;
  transition?: MotionProps['transition'];
}

// Create a wrapper component that handles the props correctly
const AnimatedBox: React.FC<MotionBoxProps> = ({ 
  children, 
  initial, 
  animate, 
  exit, 
  transition,
  ...rest 
}) => {
  return (
    <MotionBox
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...rest}
    >
      {children}
    </MotionBox>
  );
};

export default AnimatedBox; 