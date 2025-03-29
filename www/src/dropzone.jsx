import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Button from "./button";

const Dropzone = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            setError(null);
            setDownloadUrl(null);
        }

        if (rejectedFiles.length > 0) {
            setFile(null);
            setError(
                <>
                    File{" "}
                    <span className="font-medium">
                        {rejectedFiles[0].file.name}
                    </span>{" "}
                    {rejectedFiles[0].errors.some(
                        (error) => error.code === "file-too-large",
                    ) && (
                        <>
                            bự quá, tới{" "}
                            {Math.round(
                                rejectedFiles[0].file.size / 1024 / 1024,
                            )}
                            MB lận! Tối đa 5MB thôi nhé.
                        </>
                    )}
                    {rejectedFiles[0].errors.some(
                        (error) => error.code === "file-invalid-type",
                    ) && (
                        <>
                            không đúng định dạng. Ở đây chỉ chấp nhận file Excel
                            (.xlsx, .xls) thôi nhé!
                        </>
                    )}
                </>,
            );
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                [],
            "application/vnd.ms-excel": [],
        },
        // Max size: 5MB
        maxSize: 1024 * 1024 * 5,
    });

    const removeFile = () => {
        setFile(null);
        setError(null);
        setDownloadUrl(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/files/`,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                },
            );

            if (!response.ok) {
                setError("Tải lên file thất bại");
                console.error("File upload failed:", response.statusText);
                throw new Error("File upload failed");
            }

            const data = await response.json();
            console.log(data);
            setDownloadUrl(data.download_url);
        } catch (err) {
            console.error(err);
            setError("Đã xảy ra lỗi khi xử lý file. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {file ? (
                <div className="flex w-full items-center space-x-2">
                    <Button
                        variant="primary"
                        type="submit"
                        className="flex-1"
                        disabled={loading}
                    >
                        Xử lý file {file.name}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={removeFile}
                        disabled={loading}
                    >
                        Hủy bỏ
                    </Button>
                </div>
            ) : (
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
            )}
            {loading && <div>Chờ chút nhé...</div>}
            {error && (
                <div className="flex items-center justify-center">
                    <p className="max-w-96 text-red-500">{error}</p>
                </div>
            )}
            {downloadUrl && (
                <div className="flex flex-col items-center justify-center space-y-2">
                    <p>File đã được xử lý thành công!</p>
                    <a href={downloadUrl} rel="noopener noreferrer">
                        <Button variant="beautiful" type="button">
                            Tải về ngay nào
                        </Button>
                    </a>
                </div>
            )}
        </form>
    );
};

export default Dropzone;
