import React, { useState } from 'react';
import { useFormContext } from '../context/FormContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AcademicRecordsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [semesterCount, setSemesterCount] = useState(
    Object.keys(formData.semesterGrades).length || 8
  );

  const validationSchema = Yup.object({
    cgpa: Yup.number()
      .min(0, 'CGPA must be at least 0')
      .max(10, 'CGPA must be at most 10')
      .required('CGPA is required'),
    semesterGrades: Yup.object().shape(
      Array.from({ length: semesterCount }, (_, i) => i + 1).reduce(
        (acc, semester) => ({
          ...acc,
          [semester.toString()]: Yup.number()
            .min(0, 'SGPA must be at least 0')
            .max(10, 'SGPA must be at most 10')
            .required(`Semester ${semester} SGPA is required`),
        }),
        {}
      )
    ),
  });

  const formik = useFormik({
    initialValues: {
      cgpa: formData.cgpa,
      semesterGrades: { ...formData.semesterGrades },
    },
    validationSchema,
    onSubmit: (values) => {
      updateFormData(values);
    },
    enableReinitialize: true,
  });

  const handleSemesterCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const count = parseInt(e.target.value);
    setSemesterCount(count);
    
    // Update formik values with new semester count
    const updatedSemesterGrades = { ...formik.values.semesterGrades };
    
    // Remove extra semesters if count decreased
    Object.keys(updatedSemesterGrades).forEach((key) => {
      if (parseInt(key) > count) {
        delete updatedSemesterGrades[key];
      }
    });
    
    // Add new semesters if count increased
    for (let i = 1; i <= count; i++) {
      if (!updatedSemesterGrades[i.toString()]) {
        updatedSemesterGrades[i.toString()] = '';
      }
    }
    
    formik.setFieldValue('semesterGrades', updatedSemesterGrades);
  };

  // Calculate CGPA automatically based on semester grades
  const calculateCGPA = () => {
    const grades = Object.values(formik.values.semesterGrades).filter(
      (grade) => grade !== ''
    );
    
    if (grades.length === 0) return;
    
    const sum = grades.reduce(
      (acc, grade) => acc + parseFloat(grade as string),
      0
    );
    const average = sum / grades.length;
    formik.setFieldValue('cgpa', average.toFixed(2));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Academic Records</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Semester Count Selector */}
        <div className="mb-6">
          <label htmlFor="semesterCount" className="block text-sm font-medium text-gray-700 mb-1">
            Number of Semesters
          </label>
          <select
            id="semesterCount"
            name="semesterCount"
            value={semesterCount}
            onChange={handleSemesterCountChange}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Semester-wise SGPA Entries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: semesterCount }, (_, i) => i + 1).map((semester) => (
            <div key={semester}>
              <label
                htmlFor={`semesterGrades.${semester}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Semester {semester} SGPA *
              </label>
              <input
                id={`semesterGrades.${semester}`}
                name={`semesterGrades.${semester}`}
                type="number"
                step="0.01"
                min="0"
                max="10"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.semesterGrades[semester] || ''}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.touched.semesterGrades?.[semester] && 
               formik.errors.semesterGrades?.[semester] ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.semesterGrades[semester]}
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {/* Calculate CGPA Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={calculateCGPA}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate CGPA
          </button>
        </div>

        {/* CGPA */}
        <div>
          <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700 mb-1">
            Cumulative Grade Point Average (CGPA) *
          </label>
          <input
            id="cgpa"
            name="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="10"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cgpa}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.cgpa && formik.errors.cgpa ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.cgpa}</div>
          ) : null}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Previous
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AcademicRecordsForm; 