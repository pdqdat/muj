import { useState } from "react";

const Accordion = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-slate-200">
            <button onClick={toggleAccordion} className="w-full flex justify-between items-center py-5 text-slate-800">
                <span>Đôi lời nhắn nhủ</span>
                <span className={`text-slate-800 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
                        <path
                            fill-rule="evenodd"
                            d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <div className="pb-5 text-sm text-slate-500">Đây là script thống kê số liệu nếu chị muốn đọc qua</div>
            </div>
        </div>
    );
};

export default Accordion;
