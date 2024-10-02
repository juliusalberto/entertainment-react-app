export default function Form(props) {
    const {inputs, buttonText, belowText, belowUnderlineText, header, navigate, onFormSubmit} = props

    return (
        <>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md font-outfit font-light bg-semi-dark-blue">
            <h2 className="text-3xl font-thin text-white mb-6">{header}</h2>
            <form className="flex flex-col gap-4 mb-12" onSubmit={onFormSubmit}>
                {inputs}
                <button
                    type="submit"
                    className="w-full bg-red-500 mt-6 text-white py-2 rounded hover:bg-red-600 transition duration-200"
                >
                    {buttonText}
                </button>
            </form>
            <p className="mt-4 text-center text-gray-400">
            {belowText}{' '}
            <a href="#" className="text-red-500 hover:underline" onClick={navigate}>
                {belowUnderlineText}
            </a>
            </p>
        </div>
        </>
    )
}