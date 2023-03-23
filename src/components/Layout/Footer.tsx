import { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';

function Footer() {
	const [open, setOpen] = useState(false);
	return (
		<footer className="fixed p-3 justify-center items-end bottom-0 w-screen lg:w-max lg:right-0 bg-neutral-50 lg:bg-transparent   border-t lg:border-none z-50 flex h-[6vh] ">
			{/* Info */}
			<div
				className={`${
					open ? 'lg:shadow-md' : 'translate-x-[200%] opacity-0'
				} absolute bottom-[56px] right-0 lg:right-2 border border-[#000000] p-5 flex flex-col space-y-3 rounded-tl-2xl lg:rounded-3xl bg-black text-white  tracking-tight transition-all duration-500 font-mono w-max `}
			>
				<p className="">
					Built by{' '}
					<a
						href="https://jonathancarpena.me/"
						target="_blank"
						className="underline underline-offset-2 font-semibold"
					>
						Jonathan Carpena{' '}
					</a>
				</p>

				<p className="">
					Check Out the{' '}
					<a
						href="https://github.com/jonathancarpena/i-am-productive"
						className="underline underline-offset-2 font-semibold"
					>
						GitHub Repo
					</a>
				</p>

				<div className=" flex">
					<span>Dark Mode</span>
					<button className="ml-auto">Click</button>
				</div>
			</div>

			{/* Footer Toggle */}
			<button
				onClick={() => setOpen(!open)}
				className={`${
					open
						? 'bg-black text-white '
						: 'text-black bg-neutral-50 hover:bg-neutral-200'
				} text-4xl rounded-full active:scale-90 ml-auto w-9 h-9`}
			>
				<FiHelpCircle />
			</button>
		</footer>
	);
}

export default Footer;
