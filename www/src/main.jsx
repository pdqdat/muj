import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Dropzone from "./dropzone";
import BgClipPath from "./bg-clip-path";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="bg-white h-screen flex justify-center items-start md:items-center">
            <div className="relative isolate px-6 pt-14">
                <div className="text-center space-y-4">
                    <h1
                        className={
                            "text-4xl md:text-6xl h-[5.5rem] font-semibold" +
                            " bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent animate-text"
                        }
                    >
                        Thống kê số lượng thuốc
                    </h1>
                    <div className="mx-auto px-0 md:px-30">
                        <Dropzone />
                    </div>
                    <a
                        href="https://github.com/pdqdat/muj/blob/master/data-processing.ipynb"
                        target="_blank"
                        className="beautiful-btn font-medium"
                    >
                        Script thống kê số liệu
                    </a>
                </div>
                <BgClipPath />
            </div>
            <footer className="fixed bottom-0 w-full text-center text-sm md:text-base">
                Một sản phẩm của{" "}
                <a href="https://datphan.me" target="_blank">
                    datphan.me
                </a>
            </footer>
        </div>
    </StrictMode>
);
