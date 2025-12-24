import { FaRegHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full text-black pt-1 px-6 pb-8 border-t-0">
            {/* Triple Line Effect */}
            <div className="flex flex-col gap-[3px] mb-8 w-full">
                <div className="h-[2px] w-full bg-black"></div>
                <div className="h-[2px] w-full bg-black"></div>
                <div className="h-[2px] w-full bg-black"></div>
            </div>

            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Colored Dots */}
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#3b82f6]"></div> {/* Blue */}
                    <div className="w-5 h-5 rounded-full bg-[#ec4899]"></div> {/* Pink */}
                    <div className="w-5 h-5 rounded-full bg-[#eab308]"></div> {/* Yellow */}
                    <div className="w-5 h-5 rounded-full bg-black"></div>     {/* Black */}
                </div>

                {/* Made with Text */}
                <div className="flex items-center gap-2 text-lg font-medium" style={{ fontFamily: "'Clash Display', sans-serif" }}>
                    <span>Made with</span>
                    <FaRegHeart className="text-xl" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
