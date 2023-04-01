import { Component, JSXElement, createEffect } from "solid-js";

export interface InputProps {
  label: string;
  buttonAction?: (e: MouseEvent) => void;
  buttonType?: string;
  children: JSXElement;
  name: string;
  value: () => Record<string, any>;
  [key: string]: any;
}

export const Input: Component<InputProps> = (props) => {
  const {
    label,
    buttonAction,
    buttonType = "",
    children,
    error,
    name,
    value,
    ...otherProps
  } = props;
  const buttonClass = buttonType === "icon" ? "rounded-full" : "px-5 rounded";

  createEffect(() => {
    console.log(value());
  });

  return (
    <div>
      <label class=" text-xs text-[#7685a0] my-2 block">{label}</label>
      <div class=" w-full flex flex-col relative mb-4">
        <input
          class="bg-[#040407] border-[#171c2f]  border rounded text-sm py-2 px-3 text-[#b1bdd4]
          focus:outline-none focus:border-[#29304b] focus:ring-1 focus:ring-[#29304b]
    
          "
          {...otherProps}
          name={name}
          value={value()[name]}
        />
        <button
          onClick={buttonAction}
          class={`cursor-pointer bg-[#6067f940] text-[#8793FF] h-6 w-6 border-0 absolute right-0
         top-0 translate-x-[-25%] translate-y-[25%] justify-center flex items-center ${buttonClass}`}
        >
          {children}
        </button>
        {error() &&
          error()[name]?._errors?.map((er: string) => (
            <p class=" text-[red] text-xs">{er}</p>
          ))}
      </div>
    </div>
  );
};
