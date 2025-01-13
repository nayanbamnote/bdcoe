import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Check, X } from 'lucide-react';

interface TableWrapperProps {
  title: string;
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  title,
  isEditing,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  children,
}) => {
  return (
    <div className="bg-white p-[20px] sm:p-[32px] rounded-[12px] shadow-lg">
      <div className="flex items-center justify-between mb-[24px] sm:mb-[32px]">
        <h2 className="text-[20px] sm:text-[24px] font-bold text-gray-800">
          {title}
        </h2>
        <motion.div 
          className="relative w-[40px] h-[40px]"
          initial={false}
          animate={isEditing ? { width: 90 } : { width: 40 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <AnimatePresence mode="wait">
            {isEditing ? (
              <>
                <motion.button
                  key="save"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute left-0 top-0 inline-flex items-center justify-center p-[10px] rounded-full bg-[#3eb2ce] text-white hover:bg-[#35a0bc] disabled:bg-gray-300 disabled:cursor-not-allowed"
                  onClick={onSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="currentColor" fillOpacity="0.3"/>
                        <path d="M12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4V2Z" fill="currentColor"/>
                      </svg>
                    </motion.div>
                  ) : (
                    <Check size={20} />
                  )}
                </motion.button>
                <motion.button
                  key="cancel"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
                  className="absolute right-0 top-0 inline-flex items-center justify-center p-[10px] rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
                  onClick={onCancel}
                >
                  <X size={20} />
                </motion.button>
              </>
            ) : (
              <motion.button
                key="edit"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="inline-flex items-center justify-center p-[10px] rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                onClick={onEdit}
              >
                <Edit3 size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      {children}
    </div>
  );
};

export default TableWrapper; 