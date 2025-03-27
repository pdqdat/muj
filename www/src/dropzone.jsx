import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = () => {
    const [file, setFile] = useState(null);
    const [rejected, setRejected] = useState(null);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setRejected(null);
        }

        if (rejectedFiles.length > 0) {
            setRejected(rejectedFiles[0]);
            setFile(null);
        }

        console.log(rejectedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [],
            "application/vnd.ms-excel": [],
        },
        maxSize: 1024 * 1024 * 5,
    });

    const removeFile = () => {
        setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        console.log(formData.get("file"));
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div
                {...getRootProps({
                    className:
                        "flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/10 bg-transparent transition-colors hover:border-purple-600",
                })}
            >
                <input {...getInputProps()} />
                <svg
                    className="mb-2 h-8 w-8 animate-bounce text-gray-500"
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
                <p className="text-sm font-medium text-gray-600 md:text-base">
                    {isDragActive ? (
                        "Thả file vào đây nè..."
                    ) : (
                        <>
                            Kéo và thả file vào đây,{" "}
                            <br className="block sm:hidden" />
                            hoặc nhấn để tải file lên
                        </>
                    )}
                </p>
                <p className="mt-2 text-xs text-gray-500 md:text-sm">
                    Tối đa 5MB
                </p>
            </div>
            {file && (
                <div>
                    <p className="font-medium text-gray-600">File đã chọn</p>
                    <div className="flex items-center justify-center space-x-2">
                        <p className="max-w-96 truncate text-gray-500">
                            {file.name}
                        </p>
                        <button
                            className="cursor-pointer font-semibold text-gray-600 hover:text-purple-500"
                            onClick={removeFile}
                        >
                            &#x2715;
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="beautiful-btn cursor-pointer"
                    >
                        Nhấn vào đây để xử lý file
                    </button>
                </div>
            )}
            {rejected && (
                <div className="flex items-center justify-center">
                    <p className="max-w-96 text-red-500">
                        File{" "}
                        <span className="font-medium">
                            {rejected.file.name}
                        </span>{" "}
                        {rejected.errors.some(
                            (error) => error.code === "file-too-large",
                        ) && (
                            <>
                                bự quá, tới{" "}
                                {Math.round(rejected.file.size / 1024 / 1024)}MB
                                lận! Tối đa 5MB thôi nhé.
                            </>
                        )}
                        {rejected.errors.some(
                            (error) => error.code === "file-invalid-type",
                        ) && (
                            <>
                                không đúng định dạng. Ở đây chỉ chấp nhận file
                                Excel (.xlsx, .xls) thôi nhé!
                            </>
                        )}
                    </p>
                </div>
            )}
        </form>
    );
};

export default Dropzone;
