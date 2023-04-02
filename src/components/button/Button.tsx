import { Component } from "solid-js";

export interface ButtonProps {
  action: (e: MouseEvent) => void;
  label: string;
  disabled: () => boolean;
}

export const Button: Component<ButtonProps> = ({ label, action, disabled }) => {
  return (
    <button
      class="w-full bg-[#6067f9] h-8 pt-1 rounded text-sm border-0 mt-2 cursor-pointer disabled:bg-[#7685a0] disabled:cursor-not-allowed"
      disabled={disabled()}
      onClick={(e) => action(e)}
    >
      {label}
    </button>
  );
};
