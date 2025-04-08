import React, { useCallback } from 'react';
import { useFormContext } from '../context/FormContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

const CourseDetailsForm: React.FC = () => {
  const { formData, updateFormData } = useFormContext();

  const validationSchema = Yup.object({
    collegeid: Yup.string().required('College ID is required'),
    rollNo: Yup.string().required('Roll No is required'),
    course: Yup.string().required('Course is required'),
    branch: Yup.string().required('Branch is required'),
    admissionYear: Yup.string()
      .matches(/^\d{4}$/, 'Must be a valid year')
      .required('Admission year is required'),
    graduationYear: Yup.string()
      .matches(/^\d{4}$/, 'Must be a valid year')
      .test(
        'is-greater',
        'Graduation year must be after admission year',
        function (value) {
          const { admissionYear } = this.parent;
          return !admissionYear || !value || parseInt(value) > parseInt(admissionYear);
        }
      )
      .required('Graduation year is required'),
    modeOfAdmission: Yup.string().required('Mode of admission is required'),
  });

  // Use useCallback to prevent recreation on each render
  const handleSubmit = useCallback((values: any) => {
    updateFormData(values);
  }, [updateFormData]);

  const formik = useFormik({
    initialValues: {
      // Initialize with empty strings instead of undefined values
      collegeid: formData.collegeid || '',
      rollNo: formData.rollNo || '',
      course: formData.course || '',
      branch: formData.branch || '',
      admissionYear: formData.admissionYear || '',
      graduationYear: formData.graduationYear || '',
      modeOfAdmission: formData.modeOfAdmission || '',
    },
    validationSchema,
    onSubmit: handleSubmit,
    // Add these to improve performance
    validateOnChange: false,
    validateOnBlur: true,
  });

  const admissionModes = [
    'Entrance Exam',
    'Direct Admission',
    'Management Quota',
    'Sports Quota',
    'Other',
  ];

  const courses = [
    'Bachelor of Technology (B.Tech)',
    'Bachelor of Engineering (B.E)',
    'Bachelor of Science (B.Sc)',
    'Bachelor of Commerce (B.Com)',
    'Bachelor of Arts (B.A)',
    'Master of Technology (M.Tech)',
    'Master of Business Administration (MBA)',
    'Master of Science (M.Sc)',
    'Master of Arts (M.A)',
    'Doctor of Philosophy (Ph.D)',
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course & College Details</h2>
      
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* College ID */}
          <div>
            <label htmlFor="collegeid" className="block text-sm font-medium text-gray-700 mb-1">
              College ID *
            </label>
            <input
              id="collegeid"
              name="collegeid"
              placeholder='Eg.BD22BE245'
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.collegeid}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.collegeid && formik.errors.collegeid ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.collegeid}</div>
            ) : null}
          </div>

          {/* Roll No - Replaced University */}
          <div>
            <label htmlFor="rollNo" className="block text-sm font-medium text-gray-700 mb-1">
              Roll No *
            </label>
            <input
              id="rollNo"
              name="rollNo"
              type="text"
              placeholder="Eg. 2022001234"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rollNo}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.rollNo && formik.errors.rollNo ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.rollNo}</div>
            ) : null}
          </div>

          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
              Course *
            </label>
            <select
              id="course"
              name="course"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.course}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
            {formik.touched.course && formik.errors.course ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.course}</div>
            ) : null}
          </div>

          {/* Branch */}
          <div>
            <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-1">
              Branch/Specialization *
            </label>
            <input
              id="branch"
              name="branch"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.branch}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.branch && formik.errors.branch ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.branch}</div>
            ) : null}
          </div>

          {/* Admission Year */}
          <div>
            <label htmlFor="admissionYear" className="block text-sm font-medium text-gray-700 mb-1">
              Admission Year *
            </label>
            <input
              id="admissionYear"
              name="admissionYear"
              type="text"
              placeholder="YYYY"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.admissionYear}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.admissionYear && formik.errors.admissionYear ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.admissionYear}</div>
            ) : null}
          </div>

          {/* Graduation Year */}
          <div>
            <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 mb-1">
              Graduation Year *
            </label>
            <input
              id="graduationYear"
              name="graduationYear"
              type="text"
              placeholder="YYYY"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.graduationYear}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.graduationYear && formik.errors.graduationYear ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.graduationYear}</div>
            ) : null}
          </div>

          {/* Mode of Admission */}
          <div className="md:col-span-2">
            <label htmlFor="modeOfAdmission" className="block text-sm font-medium text-gray-700 mb-1">
              Mode of Admission *
            </label>
            <select
              id="modeOfAdmission"
              name="modeOfAdmission"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.modeOfAdmission}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Mode of Admission</option>
              {admissionModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
            {formik.touched.modeOfAdmission && formik.errors.modeOfAdmission ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.modeOfAdmission}</div>
            ) : null}
          </div>
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
    </motion.div>
  );
};

export default React.memo(CourseDetailsForm); 