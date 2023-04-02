import { Component, JSXElement, createEffect, splitProps } from "solid-js";
import { ZodFormattedError } from "zod";

export interface InputProps {
  label: string;
  buttonAction?: (e: MouseEvent) => void;
  buttonType?: string;
  children: JSXElement;
  name: string;
  value: () => Record<string, any>;
  error: any;
  [key: string]: any;
}

export const Input: Component<InputProps> = (props) => {
  const [local, otherProps] = splitProps(props, [
    "value",
    "name",
    "error",
    "children",
    "buttonType",
    "buttonAction",
    "label",
  ]);

  const buttonClass =
    local.buttonType === "icon" ? "rounded-full" : "px-5 mr-[-6px] rounded";
  return (
    <div>
      <label class=" text-xs text-[#7685a0] my-2 block">{local.label}</label>
      <div class="w-full flex flex-col relative mb-2">
        <input
          class="bg-[#040407] border-[#171c2f]  border rounded text-sm py-2 px-3 text-[#b1bdd4]
          focus:outline-none focus:border-[#29304b] focus:ring-1 focus:ring-[#29304b]
          h-10
          "
          {...otherProps}
          name={local.name}
          value={local.value()[local.name]}
        />
        <button
          onClick={local.buttonAction}
          class={`cursor-pointer bg-[#6067f940] text-[#8793FF] h-6 w-6 border-0 absolute right-0
         top-0 translate-x-[-40%] translate-y-[35%] justify-center flex items-center ${buttonClass}`}
        >
          {local.children}
        </button>
        {local.error() &&
          local.error()[local.name]?._errors?.map((er: string) => {
            if (er === "Expected number, received string") return;
            return <p class=" text-[red] text-xs">{er}</p>;
          })}
      </div>
    </div>
  );
};
