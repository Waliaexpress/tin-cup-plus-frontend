import { cn } from "@/lib/utils";
import { useId, forwardRef } from "react";
import { useController } from "react-hook-form";
// import DisplayError from "@/common/DisplayError";

interface TextAreaGroupProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  icon?: React.ReactNode;
  name: string;
  control: any;
  errors: any;
}

export const TextAreaGroup = forwardRef<HTMLTextAreaElement, TextAreaGroupProps>(
  (
    {
      label,
      placeholder,
      required,
      disabled,
      active,
      className,
      icon,
      rows = 6,
      name,
      control,
      errors,
      ...rest
    },
    ref
  ) => {
    const id = useId();
    
    const {
      field: { value, onChange, onBlur, ref: controllerRef },
    } = useController({
      name,
      control,
      rules: { required },
    });

    return (
      <div className={cn(className)}>
        {label && (
          <label
            htmlFor={id}
            className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
          >
            {label}
            {required && <span className="ml-1 select-none text-red">*</span>}
          </label>
        )}

        <div className="relative mt-3 [&_svg]:pointer-events-none [&_svg]:absolute [&_svg]:left-5.5 [&_svg]:top-5.5">
          <textarea
            id={id}
            name={name}
            rows={rows}
            placeholder={placeholder}
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            ref={(e) => {
              controllerRef(e);
              if (ref) {
                if (typeof ref === "function") {
                  ref(e);
                } else {
                  (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = e;
                }
              }
            }}
            disabled={disabled}
            data-active={active}
            className={cn(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary",
              icon && "py-5 pl-13 pr-5"
            )}
            {...rest}
          />
          {icon}
        </div>

        {/* <DisplayError errors={errors} name={name} /> */}
      </div>
    );
  }
);

TextAreaGroup.displayName = "TextAreaGroup";