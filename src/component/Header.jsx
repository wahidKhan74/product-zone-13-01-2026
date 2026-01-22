import { useState } from "react";
import { useLanguage } from "./context/LanguageContext";

export default function Header() {

    const [show, setShow] = useState(true);
    const { t } = useLanguage();
    if (!show) return null;
    return (
        <header className="bg-white shadow">
            <div className="relative flex items-center justify-center bg-blue-700 px-2 py-2 text-white">
                <p className="text-sm text-center">
                    {t.description}
                </p>

                <button onClick={() => setShow(false)} className="absolute right-2 rounded px-2 py-1 text-white hover:bg-blue-600">
                    ✕
                </button>
            </div>
        </header>
    )
}