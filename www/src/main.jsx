import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Dropzone from "./dropzone";
import BgClipPath from "./bg-clip-path";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <div className="flex h-screen justify-center bg-white">
            <div className="relative isolate px-4">
                <div className="pt-32 text-center lg:pt-48">
                    <h1
                        className={
                            "h-[5.5rem] text-4xl font-semibold md:text-6xl" +
                            " animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
                        }
                    >
                        Thống kê <br className="block sm:hidden" />
                        số lượng thuốc
                    </h1>
                    <div className="flex justify-center">
                        <div className="text-text-secondary ring-border hover:ring-border-hover relative rounded-full px-3 py-1 text-sm/6 ring-1 transition-colors">
                            <a
                                href="https://github.com/pdqdat/muj/blob/master/xu-ly-du-lieu.ipynb"
                                target="_blank"
                                className="text-text-secondary font-semibold"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-0"
                                />
                                Script xử lý số liệu{" "}
                                <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                    <div className="mx-auto mt-8 px-0 md:px-28">
                        <Dropzone />
                    </div>
                </div>
                <BgClipPath />
            </div>
            <footer className="text-text-secondary fixed bottom-0 w-full text-center text-sm backdrop-blur-md">
                Một sản phẩm của{" "}
                <a
                    href="https://datphan.me"
                    target="_blank"
                    className="text-primary hover:text-primary-hover font-medium"
                >
                    datphan.me
                </a>
            </footer>
        </div>
    </StrictMode>,
);
