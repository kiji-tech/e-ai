type Props = {
  options: any;
  label?: string;
  message?: string;
};
const Textarea = ({ label, options, message }: Props) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        {...options}
        className="border rounded-md w-full py-2 px-3 h-40 focus:outline-none focus:border-sky500"
      />
      {message && (
        <div className="text-red-500 text-sm my-3 text-center">{message}</div>
      )}
    </div>
  );
};
export default Textarea;
