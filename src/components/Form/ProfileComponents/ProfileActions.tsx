import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Save, X, Loader2 } from 'lucide-react';

interface ProfileActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center p-[10px] rounded-full text-[14px] font-medium transition-all duration-300 ease-in-out focus:outline-none ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
);

export const ProfileActions = ({ 
  isEditing, isSaving, onSave, onCancel, onEdit 
}: ProfileActionsProps) => (
  <motion.div 
    className="relative flex items-center gap-2 h-[40px]"
    initial={false}
  >
    <AnimatePresence mode="wait">
      {isEditing ? (
        <>
          <motion.div
            key="save"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button
              onClick={onSave}
              className="bg-[#3eb2ce] text-white hover:bg-[#35a0bc] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed"
              disabled={isSaving}
            >
              {isSaving ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="w-[20px] h-[20px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4Z" fill="currentColor" fillOpacity="0.3"/>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12H4C4 7.58172 7.58172 4 12 4V2Z" fill="currentColor"/>
                  </svg>
                </motion.div>
              ) : (
                <Save size={20} />
              )}
            </Button>
          </motion.div>
          <motion.div
            key="cancel"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Button
              onClick={onCancel}
              className="bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
            >
              <X size={20} />
            </Button>
          </motion.div>
        </>
      ) : (
        <motion.div
          key="edit"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Button
            onClick={onEdit}
            className="bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
          >
            <Pencil size={20} />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);
