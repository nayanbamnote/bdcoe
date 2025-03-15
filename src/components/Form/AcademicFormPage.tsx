import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Flex,
  IconButton,
  useColorMode
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import AcademicDetailsForm from './AcademicDetailsForm';

const AcademicFormPage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box minH="100vh" bg={bgColor} py={10}>
      <Container maxW="container.xl">
        <Flex justifyContent="flex-end" mb={4}>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            size="md"
          />
        </Flex>
        
        <VStack spacing={6} align="center" mb={10}>
          <Heading as="h1" size="xl" color={textColor}>
            Student Academic Profile
          </Heading>
          <Text color={textColor} textAlign="center" maxW="800px">
            Please complete the following form to update your academic profile. 
            This information will be used for academic records and to provide you with 
            personalized educational support.
          </Text>
        </VStack>
        
        <AcademicDetailsForm />
        
        <Box mt={10} textAlign="center">
          <Text fontSize="sm" color="gray.500">
            © {new Date().getFullYear()} College Student Portal. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default AcademicFormPage; 