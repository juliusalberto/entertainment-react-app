export default function Input(props) {
    const {type, placeholder, value, onChange} = props;

    return (
        <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full px-3 py-2 bg-semi-dark-blue border-b-gray-blue border-b text-white rounded min-h-9 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
    )
}