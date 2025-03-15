"use client";

import React from 'react';
import {
  Box,
  Container,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue
} from '@chakra-ui/react';
import { FormProvider } from '@/components/MutiForm/context/FormContext';
import MultiStepForm from '@/components/MutiForm/components/MultiStepForm';

export default function AcademicFormPage() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  return (
    <Box as="main" py={{ base: 6, md: 12 }} bg={bgColor} minH="calc(100vh - 64px)">
      <Container maxW="container.xl">
        <Heading 
          as="h1" 
          size={{ base: "xl", md: "2xl" }} 
          textAlign="center" 
          color="gray.800"
          mb={6}
        >
          Student Academic Information
        </Heading>
        
        <Alert 
          status="warning" 
          variant="left-accent" 
          borderRadius="md"
          mb={8}
          py={4}
        >
          <AlertIcon />
          <AlertDescription fontSize={{ base: "sm", md: "md" }}>
            Please complete all required sections of this form. You can save your progress and return later.
          </AlertDescription>
        </Alert>
        
        <FormProvider>
          <MultiStepForm />
        </FormProvider>
      </Container>
    </Box>
  );
}
