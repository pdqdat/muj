import { useState } from "react";

const Dropzone = () => {
    const [file, setFile] = useState();

    const handleOnChange = (e) => {
        const target = e.target;
        setFile(target.files[0]);
    };

    return (
        <div className="flex items-center justify-center w-full">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-transparent hover:border-purple-600 transition-colors"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    {file ? (
                        <p className="mb-2 text-sm text-gray-500">{file.name}</p>
                    ) : (
                        <>
                            <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Nhấn để tải file lên</span> hoặc kéo và thả file vào đây
                            </p>
                            <p className="text-xs text-gray-500">Tối đa 1.5MB</p>
                        </>
                    )}
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleOnChange} />
            </label>
        </div>
    );
};

export default Dropzone;
