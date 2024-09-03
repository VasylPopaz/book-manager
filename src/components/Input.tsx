import { InputHTMLAttributes } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

export const Input = ({
  label,
  name,
  register,
  errors,
  ...props
}: InputProps) => {
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <div className="relative">
      <label className="label">
        {label}
        <input className="field" {...register(name)} {...props} />
      </label>
      {errorMessage && <p className="field-error">{errorMessage}</p>}
    </div>
  );
};
