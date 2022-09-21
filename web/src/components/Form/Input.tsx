import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

const Input: React.FC<Props> = (props: Props) => {
  return (
    <input
      {...props}
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
    />
  );
};

export { Input };
