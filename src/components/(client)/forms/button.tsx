import Loading from "@/app/loading";

type Props = {
    label: string;
    options: {
        type: "submit" | "button";
        disabled?: boolean;
        onClick?: () => void;
    };
};

const Button = ({ label, options }: Props) => {
    return (
        <button {...options} className="bg-sky-500 text-white rounded-md py-2 px-3 w-full">
            {options.disabled ? (
                <>
                    <Loading />
                    {label}
                </>
            ) : (
                label
            )}
        </button>
    );
};
export default Button;
