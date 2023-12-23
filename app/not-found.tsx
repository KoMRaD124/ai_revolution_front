"use client";
import React, { useState } from "react";
import Image from "next/image";
import style from "./styles.module.scss"
export default function NotFound() {
const [isHovered, setIsHovered] = useState(false);

return (
		
  <main className={"grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 relative " + style.bg}>
	 <div className="absolute top-0 left-0 mt-12 ml-12 z-20">
        <Image src="/CREACRAFT.svg" alt="CREACRAFT Logo" width={120} height={16} />
      </div>
	 
{/* 	<Image src="/404bg.png" alt="404 Background" layout="fill" objectFit="cover" />
 */}	<div className="text-center relative z-10 text-white">
	  <div className="flex items-center justify-center">
		<p className="text-base font-semibold text-indigo-600">
		  <Image src="/404.png" alt="404" width={350} height={350} />
		</p>
	  </div>
	  <p className="mt-10 text-base tracking-tight text-gray-900 sm:text-5xl text-white">Ой! Такой страницы не существует.</p>
	  <p className="text-base tracking-tight text-gray-900 sm:text-5xl text-white">Вероятно, она была удалена, либо ее здесь никогда не было.</p>
	  <div className="mt-10 flex items-center justify-center gap-x-6">
		<a
		  href="/"
		  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		  onMouseEnter={() => setIsHovered(true)}
		  onMouseLeave={() => setIsHovered(false)}
		  style={{
			display: "inline-flex",
			height: "40px",
			padding: "14px 20px",
			justifyContent: "center",
			alignItems: "center",
			gap: "10px",
			borderRadius: "24px",
			border: "1px solid rgba(246, 246, 246, 0.40)",
			backgroundColor: isHovered ? "#4A7AFF" : "transparent",
		  }}
		>
		  Главная страница
		</a>
	  </div>
	</div>
  </main>
);
}