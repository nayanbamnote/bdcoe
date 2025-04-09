import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import AnimatedBox from './MotionBox';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Grid,
  GridItem,
  FormErrorMessage,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  HStack,
  Badge,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Plus, Trash2 } from 'lucide-react';

interface SemesterGrade {
  id: string;
  semester: string;
  year: string;
  sgpa: string;
  credits: string;
}

const AcademicHistory: React.FC = () => {
  const { formData, updateFormData, nextStep, markStepAsCompleted } = useFormContext();
  const toast = useToast();
  const [semesterGrades, setSemesterGrades] = useState<SemesterGrade[]>(
    formData.semesterGrades || []
  );

  const tableHeaderBg = useColorModeValue('gray.100', 'gray.700');
  const tableBorderColor = useColorModeValue('gray.200', 'gray.600');

  const validationSchema = Yup.object({
    semester: Yup.string().required('Semester is required'),
    year: Yup.string().required('Year is required'),
    sgpa: Yup.number()
      .required('SGPA is required')
      .min(0, 'SGPA must be at least 0')
      .max(10, 'SGPA cannot exceed 10'),
    credits: Yup.number()
      .required('Credits are required')
      .positive('Credits must be positive'),
  });

  const formik = useFormik({
    initialValues: {
      semester: '',
      year: '',
      sgpa: '',
      credits: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newGrade: SemesterGrade = {
        id: Date.now().toString(),
        semester: values.semester,
        year: values.year,
        sgpa: values.sgpa,
        credits: values.credits,
      };

      const updatedGrades = [...semesterGrades, newGrade];
      setSemesterGrades(updatedGrades);
      updateFormData({ semesterGrades: updatedGrades });
      resetForm();

      toast({
        title: "Semester added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleDeleteSemester = (id: string) => {
    const updatedGrades = semesterGrades.filter(grade => grade.id !== id);
    setSemesterGrades(updatedGrades);
    updateFormData({ semesterGrades: updatedGrades });

    toast({
      title: "Semester removed",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const calculateCGPA = () => {
    if (semesterGrades.length === 0) return 0;

    let totalCredits = 0;
    let totalGradePoints = 0;

    semesterGrades.forEach(grade => {
      const credits = parseFloat(grade.credits);
      const sgpa = parseFloat(grade.sgpa);
      
      if (!isNaN(credits) && !isNaN(sgpa)) {
        totalCredits += credits;
        totalGradePoints += (sgpa * credits);
      }
    });

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
  };

  const handleSubmit = () => {
    updateFormData({ 
      semesterGrades,
      cgpa: calculateCGPA()
    });
    
    // Mark this step as completed
    markStepAsCompleted(2);
    
    toast({
      title: "Academic history saved",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    
    nextStep();
  };

  return (
    <AnimatedBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      p={{ base: 4, md: 8 }} 
      bg="white" 
      borderRadius="lg" 
      boxShadow="md"
    >
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading size={{ base: "md", md: "lg" }} mb={3}>Academic History</Heading>
          <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>Track your semester-wise academic performance</Text>
        </Box>

        <form onSubmit={formik.handleSubmit}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
            <GridItem>
              <FormControl isInvalid={!!formik.errors.semester && formik.touched.semester}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>Semester</FormLabel>
                <Input
                  name="semester"
                  placeholder="e.g., 1st, 2nd"
                  value={formik.values.semester}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize={{ base: "md", md: "lg" }}
                  height={{ base: "10", md: "12" }}
                />
                <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.semester}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!formik.errors.year && formik.touched.year}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>Year</FormLabel>
                <Input
                  name="year"
                  placeholder="e.g., 2023-24"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize={{ base: "md", md: "lg" }}
                  height={{ base: "10", md: "12" }}
                />
                <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.year}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!formik.errors.sgpa && formik.touched.sgpa}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>SGPA</FormLabel>
                <Input
                  name="sgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="e.g., 8.5"
                  value={formik.values.sgpa}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize={{ base: "md", md: "lg" }}
                  height={{ base: "10", md: "12" }}
                />
                <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.sgpa}</FormErrorMessage>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!formik.errors.credits && formik.touched.credits}>
                <FormLabel fontSize={{ base: "md", md: "lg" }}>Credits</FormLabel>
                <Input
                  name="credits"
                  type="number"
                  step="1"
                  min="1"
                  placeholder="e.g., 24"
                  value={formik.values.credits}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fontSize={{ base: "md", md: "lg" }}
                  height={{ base: "10", md: "12" }}
                />
                <FormErrorMessage fontSize={{ base: "sm", md: "md" }}>{formik.errors.credits}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <Box mt={6} textAlign="right">
            <Button
              type="submit"
              leftIcon={<Plus size={18} />}
              colorScheme="blue"
              size={{ base: "md", md: "lg" }}
              px={6}
            >
              Add Semester
            </Button>
          </Box>
        </form>

        <Divider my={6} />

        {semesterGrades.length > 0 ? (
          <Box overflowX="auto">
            <Table variant="simple" size="md" borderWidth="1px" borderColor={tableBorderColor}>
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th fontSize={{ base: "sm", md: "md" }}>Semester</Th>
                  <Th fontSize={{ base: "sm", md: "md" }}>Year</Th>
                  <Th isNumeric fontSize={{ base: "sm", md: "md" }}>SGPA</Th>
                  <Th isNumeric fontSize={{ base: "sm", md: "md" }}>Credits</Th>
                  <Th width="50px"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {semesterGrades.map((grade) => (
                  <Tr key={grade.id}>
                    <Td fontSize={{ base: "sm", md: "md" }}>{grade.semester}</Td>
                    <Td fontSize={{ base: "sm", md: "md" }}>{grade.year}</Td>
                    <Td isNumeric fontSize={{ base: "sm", md: "md" }}>{grade.sgpa}</Td>
                    <Td isNumeric fontSize={{ base: "sm", md: "md" }}>{grade.credits}</Td>
                    <Td>
                      <IconButton
                        aria-label="Delete semester"
                        icon={<Trash2 size={18} />}
                        size="md"
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => handleDeleteSemester(grade.id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <HStack mt={6} justify="flex-end" spacing={4}>
              <Text fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>CGPA:</Text>
              <Badge colorScheme="green" fontSize={{ base: "md", md: "lg" }} px={4} py={2} borderRadius="md">
                {calculateCGPA()}
              </Badge>
            </HStack>
          </Box>
        ) : (
          <Box textAlign="center" py={8} bg="gray.50" borderRadius="md">
            <Text color="gray.500" fontSize={{ base: "md", md: "lg" }}>No semester grades added yet</Text>
          </Box>
        )}

        <Box pt={6} display="flex" justifyContent="flex-end">
          <Button 
            onClick={handleSubmit} 
            colorScheme="blue"
            size={{ base: "md", md: "lg" }}
            px={6}
          >
            Save & Continue
          </Button>
        </Box>
      </VStack>
    </AnimatedBox>
  );
};

export default AcademicHistory; 