const baseClasses =
    "focus-visible:outline-primary cursor-pointer rounded-md font-semibold shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantClasses = {
    primary:
        "bg-primary hover:bg-primary-hover flex items-center justify-center px-3 py-1.5 leading-6 text-white transition-colors",
    beautiful:
        "animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 px-3.5 py-2 text-white",
    outline:
        "border-border text-text-secondary border bg-transparent px-3 py-1.5 shadow-sm transition-colors hover:bg-gray-50",
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
