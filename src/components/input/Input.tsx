export interface InputProps {}

export const Input = ({
  label,
  value,
  buttonAction,
  buttonType = "",
  children,
  ...otherProps
}) => {
  return (
    <div>
      <label class=" text-xs text-[#7685a0] my-2 block">{label()}</label>
      <div class=" w-full flex flex-col relative mb-4">
        <input
          value={value}
          class="bg-[#040407] border-[#171c2f] border rounded text-sm py-2 px-3 text-[#b1bdd4]"
          {...otherProps}
        />
        {buttonType === "icon" ? (
          <button
            onClick={buttonAction}
            class="cursor-pointer bg-[#6067f940]  h-6 w-6 border-0 absolute right-0
       top-0 translate-x-[-25%] translate-y-[25%] justify-center flex items-center rounded-full"
          >
            {children}
          </button>
        ) : (
          <button
            onClick={buttonAction}
            class="cursor-pointer bg-[#6067f940] text-[#8793FF] text-xs px-2 rounded h-6 border-0
        absolute right-0 top-0 translate-x-[-25%] translate-y-[25%]"
          >
            {children}
          </button>
        )}
      </div>
    </div>
  );
};
