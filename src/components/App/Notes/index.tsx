import { useEffect, useState } from 'react';

// Components
import Section from '../../Layout/Section';
import { FiLoader, FiTrash2 } from 'react-icons/fi';

import { Note } from '../../../lib/interfaces';

interface Props {
	visible: boolean;
}

function Notes({ visible }: Props) {
	const [listOfNotes, setListOfNotes] = useState<Note[] | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [note, setNote] = useState<Note>({
		id: `${Math.random()}`,
		title: '',
		body: '',
	});
	const [edit, setEdit] = useState(false);
	const storageKey = 'i-am-productive-notes';

	// On Mount
	useEffect(() => {
		if (listOfNotes === null) {
			getNotes();
		}
	});

	// Warn Before Leaving
	useEffect(() => {
		const alertUser = (e: BeforeUnloadEvent) => {
			if (note.body.length > 0 || note.title.length > 0) {
				e.preventDefault();
				e.returnValue = '';
			}
		};

		window.addEventListener('beforeunload', alertUser);
		return () => {
			window.removeEventListener('beforeunload', alertUser);
		};
	}, [note]);
	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setNote({
			...note,
			[e.currentTarget.name]: e.currentTarget.value,
		});
	}

	function getNotes() {
		setLoading(true);
		let prevNotes: any = localStorage.getItem(storageKey);
		if (prevNotes) {
			prevNotes = JSON.parse(prevNotes);
		} else {
			localStorage.setItem(storageKey, JSON.stringify([]));
			prevNotes = [];
		}
		setListOfNotes(prevNotes);

		setLoading(false);
	}

	function handleFormReset() {
		setNote({
			id: `${Math.random()}`,
			title: '',
			body: '',
		});
	}

	function handleAddNote(e: React.FormEvent) {
		e.preventDefault();

		if (note.title.length > 0 && note.body.length > 0) {
			let temp: any = [];
			if (listOfNotes && listOfNotes.length) {
				temp = [...listOfNotes];
			}

			if (edit) {
				let indexOfEditedNote = temp.findIndex(
					(item: Note) => item.id === note.id
				);
				temp[indexOfEditedNote] = note;
				setEdit(false);
			} else {
				temp = [...temp, note];
			}

			localStorage.setItem(storageKey, JSON.stringify(temp));
			handleFormReset();
			getNotes();
		} else {
			alert('Please add to the note before saving.');
		}
	}

	function handleDeleteNote(item: Note) {
		const confirm = window.confirm(
			'Are you sure you want to permanently delete this note?'
		);

		if (confirm) {
			let filteredNotes: Note[] = [];
			if (listOfNotes && listOfNotes.length) {
				filteredNotes = [...listOfNotes.filter((temp) => temp.id !== item.id)];
			}
			localStorage.setItem(storageKey, JSON.stringify(filteredNotes));
			setListOfNotes(filteredNotes);
			handleFormReset();
		}
	}

	function handlePrevNoteClick(item: Note) {
		let proceed = true;
		if (note.title && note.body) {
			proceed = window.confirm(
				'You have not saved this note yet, are you sure you want to open another note?'
			);
		}

		if (proceed) {
			setEdit(true);
			setNote(item);
		}
	}

	return (
		<Section
			isVisible={visible}
			uniqueKey="notes"
			sx="relative flex space-x-3 w-full h-full font-mono bg-inherit"
		>
			{/* Directory */}
			<div className="max-w-xs w-full ">
				<button
					type="submit"
					onClick={handleAddNote}
					className=" text-center text-lg px-5 bg-neutral-100 border rounded-full mb-4"
				>
					Save Note
				</button>
				{loading ? (
					<FiLoader className="text-xl animate-spin mt-3" />
				) : (
					listOfNotes &&
					listOfNotes.length > 0 && (
						<ul className="flex flex-col space-y-2 ">
							{listOfNotes.map((item, idx) => (
								<li
									key={item.id}
									onClick={() => handlePrevNoteClick(item)}
									className="hover:underline cursor-pointer truncate"
								>
									{`${idx + 1}.${item.title}`}
								</li>
							))}
						</ul>
					)
				)}
			</div>

			{/* Form */}
			<form className="px-3 max-w-2xl w-full justify-self-center overflow-y-auto overflow-x-hidden max-h-full pr-2 bg-inherit flex flex-col pb-1">
				<div className="sticky top-0 pb-4 bg-inherit z-40">
					{/* Title  */}
					<div className="relative mb-4 bg-inherit">
						<h1 className="text-3xl font-bold  bg-inherit w-full">
							{note.title.length > 0 ? note.title : 'Title'}
						</h1>
						<input
							value={note['title']}
							name="title"
							onChange={handleChange}
							placeholder="Title"
							className="top-0 absolute  text-3xl font-bold outline-none bg-inherit w-full"
						/>
					</div>

					{/* Text Config */}
					<div className="flex gap-2 w-full">
						<button className="border-2 border-black w-5 aspect-square h-auto">
							B
						</button>
						<button className="border-2 border-black w-5 aspect-square h-auto">
							B
						</button>
						<button className="border-2 border-black w-5 aspect-square h-auto">
							B
						</button>

						{edit && (
							<button
								onClick={() => handleDeleteNote(note)}
								className="hover:bg-red-500 hover:text-white ml-auto border-2 border-red-500 w-7 h-7 text-center rounded-md text-red-500 flex justify-center items-center "
							>
								<FiTrash2 className="" />
							</button>
						)}
					</div>
				</div>

				{/* Body */}
				<div className="relative flex-1 ">
					<textarea
						value={note['body']}
						name="body"
						onChange={handleChange}
						placeholder="Write Here..."
						className="top-0  left-0 absolute outline-none bg-inherit w-full h-full"
					/>
				</div>
			</form>
		</Section>
	);
}

export default Notes;
