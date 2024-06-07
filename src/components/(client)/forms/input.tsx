type Props = {
  options: any;
  message?: string;
};
const Input = ({ options, message }: Props) => {
  return (
    <>
      <input
        {...options}
        className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
      />
      {message && (
        <div className="text-red-500 text-sm my-3 text-center">{message}</div>
      )}
    </>
  );
};
export default Input;
