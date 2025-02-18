import React, { useEffect, useRef } from "react";

export type CheckboxState = "checked" | "unchecked" | "indeterminate";

interface CheckboxProps {
  state?: CheckboxState;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  state = "checked",
  checked,
  onChange,
  label,
}) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = state === "indeterminate";
    }
  }, [state]);

  const handleClick = () => {
    onChange?.(!checked);
  };

  return (
    <div className="checkbox-container" onClick={handleClick}>
      <input ref={checkboxRef} type="checkbox" checked={checked} readOnly />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
