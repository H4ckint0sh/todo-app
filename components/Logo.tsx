import sun from "../images/icon-sun.svg";
import Image from "next/image";

const Logo = () => {
	return (
		<article className="flex items-center justify-between mt-20 px-10 md:p-0 md:mt-32 md:max-w-xl md:mx-auto">
			<h2 className="text-white text-4xl tracking-widest uppercase">
				Todo
			</h2>
			<Image src={sun} alt="" className="cursor-pointer" />
		</article>
	);
};

export default Logo;
