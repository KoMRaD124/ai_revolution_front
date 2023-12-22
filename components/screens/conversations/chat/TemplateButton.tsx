import React from "react";
import Image from "next/image";
import {
	Book,
	
} from '@/components/common/Icons'

const TemplateButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center border border-blue-500 rounded-lg text-white focus:outline-none transition-all duration-300 hover:bg-opacity-15 hover:bg-blue-500"
            style={{
                marginBottom: "24px",
                marginTop: "auto",
                padding: "8px 20px",
                borderRadius:"24px"
            }}
        >
            <div className="relative" style={{ width: "20px", height: "20px", marginRight: "5px" }}>
              <Book/>
            </div>
            Полезные шаблоны
        </button>
    );
};

export default TemplateButton;