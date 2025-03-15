import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  FormErrorMessage,
  VStack,
  HStack,
  Text,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Radio,
  RadioGroup,
  Stack,
  Divider,
  useColorModeValue,
  Button,
  Flex,
  Grid,
  GridItem
} from '@chakra-ui/react';
import MultiStepForm, { FormStep, FormData } from './MultiStepForm';

// Basic Information Step
const BasicInfoStep = ({ data, updateData, setValid }) => {
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    studentId: '',
    program: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: !data.name ? 'Name is required' : '',
      email: !data.email ? 'Email is required' : !data.email.includes('@') ? 'Invalid email format' : '',
      studentId: !data.studentId ? 'Student ID is required' : '',
      program: !data.program ? 'Program is required' : ''
    };
    
    setErrors(newErrors);
    
    const isValid = !Object.values(newErrors).some(error => error);
    setValid(isValid);
    
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired isInvalid={!!errors.name}>
        <FormLabel>Full Name</FormLabel>
        <Input
          name="name"
          value={data.name || ''}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          value={data.email || ''}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.studentId}>
        <FormLabel>Student ID</FormLabel>
        <Input
          name="studentId"
          value={data.studentId || ''}
          onChange={handleChange}
          placeholder="Enter your student ID"
        />
        <FormErrorMessage>{errors.studentId}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.program}>
        <FormLabel>Program</FormLabel>
        <Select
          name="program"
          value={data.program || ''}
          onChange={handleChange}
          placeholder="Select your program"
        >
          <option value="btech">B.Tech</option>
          <option value="mtech">M.Tech</option>
          <option value="phd">Ph.D</option>
          <option value="bsc">B.Sc</option>
          <option value="msc">M.Sc</option>
        </Select>
        <FormErrorMessage>{errors.program}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

// Educational Background Step
const EducationalBackgroundStep = ({ data, updateData, setValid }) => {
  const [errors, setErrors] = useState({
    highSchool: '',
    highSchoolYear: '',
    highSchoolPercentage: '',
    college: ''
  });

  const validateForm = () => {
    const newErrors = {
      highSchool: !data.highSchool ? 'High school name is required' : '',
      highSchoolYear: !data.highSchoolYear ? 'Graduation year is required' : '',
      highSchoolPercentage: !data.highSchoolPercentage ? 'Percentage is required' : 
                           (parseFloat(data.highSchoolPercentage) < 0 || parseFloat(data.highSchoolPercentage) > 100) ? 
                           'Percentage must be between 0 and 100' : '',
      college: data.hasCollege && !data.college ? 'College name is required' : ''
    };
    
    setErrors(newErrors);
    
    const isValid = !Object.values(newErrors).some(error => error);
    setValid(isValid);
    
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateData({
      ...data,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNumberChange = (name, value) => {
    updateData({
      ...data,
      [name]: value
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontWeight="bold" fontSize="lg">High School Information</Text>
      
      <FormControl isRequired isInvalid={!!errors.highSchool}>
        <FormLabel>High School Name</FormLabel>
        <Input
          name="highSchool"
          value={data.highSchool || ''}
          onChange={handleChange}
          placeholder="Enter your high school name"
        />
        <FormErrorMessage>{errors.highSchool}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.highSchoolYear}>
        <FormLabel>Year of Graduation</FormLabel>
        <NumberInput
          min={1990}
          max={new Date().getFullYear()}
          value={data.highSchoolYear || ''}
          onChange={(value) => handleNumberChange('highSchoolYear', value)}
        >
          <NumberInputField placeholder="Enter graduation year" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.highSchoolYear}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.highSchoolPercentage}>
        <FormLabel>Percentage/CGPA</FormLabel>
        <NumberInput
          min={0}
          max={100}
          step={0.01}
          value={data.highSchoolPercentage || ''}
          onChange={(value) => handleNumberChange('highSchoolPercentage', value)}
        >
          <NumberInputField placeholder="Enter percentage" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.highSchoolPercentage}</FormErrorMessage>
      </FormControl>

      <Divider my={2} />

      <FormControl>
        <Checkbox
          name="hasCollege"
          isChecked={data.hasCollege || false}
          onChange={handleChange}
        >
          I have previous college education
        </Checkbox>
      </FormControl>

      {data.hasCollege && (
        <>
          <FormControl isRequired={data.hasCollege} isInvalid={!!errors.college}>
            <FormLabel>College/University Name</FormLabel>
            <Input
              name="college"
              value={data.college || ''}
              onChange={handleChange}
              placeholder="Enter your college name"
            />
            <FormErrorMessage>{errors.college}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>Degree</FormLabel>
            <Input
              name="collegeDegree"
              value={data.collegeDegree || ''}
              onChange={handleChange}
              placeholder="Enter your degree"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Year of Graduation</FormLabel>
            <NumberInput
              min={1990}
              max={new Date().getFullYear()}
              value={data.collegeYear || ''}
              onChange={(value) => handleNumberChange('collegeYear', value)}
            >
              <NumberInputField placeholder="Enter graduation year" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </>
      )}
    </VStack>
  );
};

// Current Academic Details Step
const CurrentAcademicsStep = ({ data, updateData, setValid }) => {
  const [errors, setErrors] = useState({
    currentSemester: '',
    currentCGPA: '',
    department: ''
  });

  const validateForm = () => {
    const newErrors = {
      currentSemester: !data.currentSemester ? 'Current semester is required' : '',
      currentCGPA: !data.currentCGPA ? 'CGPA is required' : 
                  (parseFloat(data.currentCGPA) < 0 || parseFloat(data.currentCGPA) > 10) ? 
                  'CGPA must be between 0 and 10' : '',
      department: !data.department ? 'Department is required' : ''
    };
    
    setErrors(newErrors);
    
    const isValid = !Object.values(newErrors).some(error => error);
    setValid(isValid);
    
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value
    });
  };

  const handleNumberChange = (name, value) => {
    updateData({
      ...data,
      [name]: value
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired isInvalid={!!errors.department}>
        <FormLabel>Department</FormLabel>
        <Select
          name="department"
          value={data.department || ''}
          onChange={handleChange}
          placeholder="Select your department"
        >
          <option value="cse">Computer Science & Engineering</option>
          <option value="ece">Electronics & Communication Engineering</option>
          <option value="me">Mechanical Engineering</option>
          <option value="ce">Civil Engineering</option>
          <option value="ee">Electrical Engineering</option>
          <option value="other">Other</option>
        </Select>
        <FormErrorMessage>{errors.department}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.currentSemester}>
        <FormLabel>Current Semester</FormLabel>
        <NumberInput
          min={1}
          max={10}
          value={data.currentSemester || ''}
          onChange={(value) => handleNumberChange('currentSemester', value)}
        >
          <NumberInputField placeholder="Enter current semester" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.currentSemester}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.currentCGPA}>
        <FormLabel>Current CGPA</FormLabel>
        <NumberInput
          min={0}
          max={10}
          step={0.01}
          value={data.currentCGPA || ''}
          onChange={(value) => handleNumberChange('currentCGPA', value)}
        >
          <NumberInputField placeholder="Enter your CGPA" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <FormErrorMessage>{errors.currentCGPA}</FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel>Academic Achievements</FormLabel>
        <Textarea
          name="achievements"
          value={data.achievements || ''}
          onChange={handleChange}
          placeholder="List your academic achievements"
          rows={3}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Backlogs (if any)</FormLabel>
        <NumberInput
          min={0}
          value={data.backlogs || 0}
          onChange={(value) => handleNumberChange('backlogs', value)}
        >
          <NumberInputField placeholder="Number of backlogs" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </VStack>
  );
};

// Skills & Interests Step
const SkillsInterestsStep = ({ data, updateData, setValid }) => {
  const [errors, setErrors] = useState({
    primaryInterest: ''
  });

  const validateForm = () => {
    const newErrors = {
      primaryInterest: !data.primaryInterest ? 'Primary interest is required' : ''
    };
    
    setErrors(newErrors);
    
    const isValid = !Object.values(newErrors).some(error => error);
    setValid(isValid);
    
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value
    });
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;
    const skills = data.skills || [];
    
    if (checked) {
      updateData({
        ...data,
        skills: [...skills, value]
      });
    } else {
      updateData({
        ...data,
        skills: skills.filter(skill => skill !== value)
      });
    }
  };

  const handleRadioChange = (value) => {
    updateData({
      ...data,
      primaryInterest: value
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired isInvalid={!!errors.primaryInterest}>
        <FormLabel>Primary Area of Interest</FormLabel>
        <RadioGroup 
          onChange={handleRadioChange} 
          value={data.primaryInterest || ''}
        >
          <Stack direction="column" spacing={2}>
            <Radio value="webdev">Web Development</Radio>
            <Radio value="appdev">App Development</Radio>
            <Radio value="ai">Artificial Intelligence/Machine Learning</Radio>
            <Radio value="cybersecurity">Cybersecurity</Radio>
            <Radio value="dataScience">Data Science</Radio>
            <Radio value="other">Other</Radio>
          </Stack>
        </RadioGroup>
        <FormErrorMessage>{errors.primaryInterest}</FormErrorMessage>
      </FormControl>

      {data.primaryInterest === 'other' && (
        <FormControl>
          <FormLabel>Specify Other Interest</FormLabel>
          <Input
            name="otherInterest"
            value={data.otherInterest || ''}
            onChange={handleChange}
            placeholder="Specify your interest"
          />
        </FormControl>
      )}

      <FormControl>
        <FormLabel>Technical Skills</FormLabel>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <GridItem>
            <Checkbox 
              value="javascript" 
              isChecked={data.skills?.includes('javascript')}
              onChange={handleSkillsChange}
            >
              JavaScript
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="python" 
              isChecked={data.skills?.includes('python')}
              onChange={handleSkillsChange}
            >
              Python
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="java" 
              isChecked={data.skills?.includes('java')}
              onChange={handleSkillsChange}
            >
              Java
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="cpp" 
              isChecked={data.skills?.includes('cpp')}
              onChange={handleSkillsChange}
            >
              C/C++
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="react" 
              isChecked={data.skills?.includes('react')}
              onChange={handleSkillsChange}
            >
              React
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="node" 
              isChecked={data.skills?.includes('node')}
              onChange={handleSkillsChange}
            >
              Node.js
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="sql" 
              isChecked={data.skills?.includes('sql')}
              onChange={handleSkillsChange}
            >
              SQL
            </Checkbox>
          </GridItem>
          <GridItem>
            <Checkbox 
              value="aws" 
              isChecked={data.skills?.includes('aws')}
              onChange={handleSkillsChange}
            >
              AWS
            </Checkbox>
          </GridItem>
        </Grid>
      </FormControl>

      <FormControl>
        <FormLabel>Other Skills</FormLabel>
        <Textarea
          name="otherSkills"
          value={data.otherSkills || ''}
          onChange={handleChange}
          placeholder="List any other skills you have"
          rows={2}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Projects</FormLabel>
        <Textarea
          name="projects"
          value={data.projects || ''}
          onChange={handleChange}
          placeholder="Briefly describe your projects"
          rows={3}
        />
      </FormControl>
    </VStack>
  );
};

// Additional Information Step
const AdditionalInfoStep = ({ data, updateData, setValid }) => {
  useEffect(() => {
    // This step is optional, so always valid
    setValid(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({
      ...data,
      [name]: value
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl>
        <FormLabel>Career Goals</FormLabel>
        <Textarea
          name="careerGoals"
          value={data.careerGoals || ''}
          onChange={handleChange}
          placeholder="Describe your career goals"
          rows={3}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Extracurricular Activities</FormLabel>
        <Textarea
          name="extracurricular"
          value={data.extracurricular || ''}
          onChange={handleChange}
          placeholder="List your extracurricular activities"
          rows={3}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Additional Information</FormLabel>
        <Textarea
          name="additionalInfo"
          value={data.additionalInfo || ''}
          onChange={handleChange}
          placeholder="Any additional information you'd like to share"
          rows={3}
        />
      </FormControl>
    </VStack>
  );
};

// Main Form Component
const AcademicDetailsForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  
  // Define form steps
  const steps: FormStep[] = [
    {
      id: 'basicInfo',
      title: 'Basic Information',
      component: <BasicInfoStep />,
      isRequired: true
    },
    {
      id: 'educationalBackground',
      title: 'Educational Background',
      component: <EducationalBackgroundStep />,
      isRequired: true
    },
    {
      id: 'currentAcademics',
      title: 'Current Academic Details',
      component: <CurrentAcademicsStep />,
      isRequired: true
    },
    {
      id: 'skillsInterests',
      title: 'Skills & Interests',
      component: <SkillsInterestsStep />,
      isRequired: true
    },
    {
      id: 'additionalInfo',
      title: 'Additional Information',
      component: <AdditionalInfoStep />,
      isRequired: false
    }
  ];

  // Handle form submission
  const handleSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your backend
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        // You can redirect or show success message here
      }, 1500);
    });
  };

  // Handle saving progress
  const handleSave = (data: FormData) => {
    console.log('Progress saved:', data);
    // Here you would typically save to localStorage or backend
    localStorage.setItem('academicFormData', JSON.stringify(data));
    return Promise.resolve();
  };

  // Load saved data on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('academicFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  return (
    <Box p={4}>
      <MultiStepForm
        steps={steps}
        initialData={formData}
        onSubmit={handleSubmit}
        onSave={handleSave}
        colorScheme="blue"
      />
    </Box>
  );
};

export default AcademicDetailsForm; 