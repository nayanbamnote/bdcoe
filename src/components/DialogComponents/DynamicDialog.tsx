import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { AreaItem } from "../FormComponents/DynamicDetail";
import { DatePickerField } from "./DatePickerField";
import { SelectField } from "./SelectField";

interface DynamicDialogProps { 
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  area: AreaItem[][];
  onSave: (updatedArea: AreaItem[][]) => void;
}

const formatAadhar = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove all non-digit characters
    .replace(/(.{4})/g, "$1 ") // Insert a space after every 4 digits
    .trim(); // Remove trailing spaces
};

const DynamicDialog: React.FC<DynamicDialogProps> = ({
  isOpen, 
  onOpenChange, 
  area,
  onSave
}) => {
  console.log(area, 'area in DnamicDialog')
  // Create a dynamic form schema based on the area
  const createFormSchema = () => {
    const schemaFields: { [key: string]: z.ZodType<any> } = {};
  
    area.forEach((section, sectionIndex) => {
      section.forEach((item, itemIndex) => {
        item.fields.forEach((field, fieldIndex) => {
          const fieldKey = `section_${sectionIndex}_item_${itemIndex}_field_${fieldIndex}`;
          schemaFields[fieldKey] = field.validation || z.string().min(1, "Field cannot be empty");
        });
      });
    });
  
    return z.object(schemaFields);
  };

  // Dynamic form schema
  const FormSchema = createFormSchema();
  type FormSchemaType = z.infer<typeof FormSchema>;

  // Prepare initial form values
  const getInitialValues = () => {
    const initialValues: { [key: string]: string } = {};
    
    area.forEach((section, sectionIndex) => {
      section.forEach((item, itemIndex) => {
        item.fields.forEach((field, fieldIndex) => {
          const fieldKey = `section_${sectionIndex}_item_${itemIndex}_field_${fieldIndex}`;
          initialValues[fieldKey] = field.value;
        });
      });
    });

    return initialValues;
  };

  // Form setup
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: getInitialValues(),
    mode: 'onChange'
  });

  // Submit handler
  const onSubmit = (data: FormSchemaType) => {
    // Reconstruct area with updated values
    const updatedArea = area.map((section, sectionIndex) => 
      section.map((item, itemIndex) => ({
        ...item,
        fields: item.fields.map((field, fieldIndex) => {
          const fieldKey = `section_${sectionIndex}_item_${itemIndex}_field_${fieldIndex}`;
          return { 
            ...field,
            value: data[fieldKey]
          };
        })
      }))
    );

    onSave(updatedArea);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {area.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                {section.map((item, itemIndex) => (
                  <div key={itemIndex} className="grid grid-cols-2 gap-4">
                    {item.fields.map((field, fieldIndex) => {
                      const fieldKey = `section_${sectionIndex}_item_${itemIndex}_field_${fieldIndex}`;
                      
                      return (
                        <FormField
                          key={fieldKey}
                          control={form.control}
                          name={fieldKey}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{field.label}</FormLabel>
                              <FormControl>
                                {renderFieldInput(field, formField)}
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to render different types of inputs
const renderFieldInput = (field: any, formField: any) => {
  switch (field.renderComponent) {
    case "DatePickerField":
      return (
        <DatePickerField
          value={formField.value}
          onChange={formField.onChange}
        />
      );
    case "SelectField":
      return (
        <SelectField
          value={formField.value}
          onChange={formField.onChange}
          options={field.options}
          label={field.label}
        />
      );
    default:
      return <Input {...formField} 
      onChange={(e) => {
        let updatedValue = e.target.value;
        if (field.label === "Aadhar No") {
          updatedValue = formatAadhar(e.target.value);
        }
        formField.onChange(updatedValue); // Update the form field value
      }}
      />;
  }
};

export default DynamicDialog;