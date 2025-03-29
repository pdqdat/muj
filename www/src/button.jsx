const baseClasses =
    "cursor-pointer rounded-md font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:pointer-events-none disabled:opacity-50";

const variantClasses = {
    primary:
        "text-white flex items-center justify-center bg-purple-600 px-3 py-1.5 leading-6 transition-colors hover:bg-purple-500",
    beautiful:
        "text-white animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 px-3.5 py-2",
    outline:
        "border border-gray-300 bg-transparent px-3 py-1.5 text-gray-900 shadow-sm hover:bg-gray-50 transition-colors",
};

const mergeClassNames = (...classes) => classes.filter(Boolean).join(" ");

const Button = ({ children, className, variant, ...props }) => {
    return (
        <button
            className={mergeClassNames(
                baseClasses,
                variantClasses[variant],
                className,
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
