function Footer() {
	return (
		<footer className="bg-neutral-100">
			<div className="max-w-7xl mx-auto py-10 text-center font-semibold tracking-tight text-neutral-400 ">
				<h2 className="  mb-2">
					Made by{' '}
					<a
						href="https://jonathancarpena.me/"
						target="_blank"
						className="underline underline-offset-2"
					>
						Jonathan Carpena{' '}
					</a>
				</h2>

				<a
					href="https://github.com/jonathancarpena/i-am-productive"
					className="hover:underline"
				>
					View GitHub Repo
				</a>
			</div>
		</footer>
	);
}

export default Footer;
