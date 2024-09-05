import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    message?: string;
    options: UseFormRegisterReturn;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input = ({ options, message, placeholder, type, value, disabled }: Props) => {
    return (
        <div className="mb-4">
            <input
                {...options}
                type={type}
                placeholder={placeholder}
                value={value}
                disabled={disabled}
                className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
            />
            {message && <div className="text-red-500 text-sm my-3 text-center">{message}</div>}
        </div>
    );
};
export default Input;
