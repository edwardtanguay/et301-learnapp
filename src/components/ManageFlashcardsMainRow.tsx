/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { IFrontendFlashcard, convertFrontendFlashcardToFlaschard } from "../shared/interfaces";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../AppContext";

interface IProps {
	frontendFlashcard: IFrontendFlashcard;
}

export const ManageFlashcardsMainRow = ({ frontendFlashcard } : IProps) => {
	const { frontendFlashcards, setFrontendFlashcards, deleteFlashcard } =
		useContext(AppContext);

	const handleDeleteFlashcard = (frontendFlashcard: IFrontendFlashcard) => {
		(async () => {
			try {
				const flashcard =
					convertFrontendFlashcardToFlaschard(frontendFlashcard);
				deleteFlashcard(flashcard);
			} catch (e: any) {
				console.log(`${e.message}`);
				alert(
					"We're sorry, your flashcard cannot be saved at this time. Try again later, or contact 2342-234-23343."
				);
			}
		})();
	};

	const toggleIsDeletingFlashcard = (
		frontendFlashcard: IFrontendFlashcard
	) => {
		frontendFlashcard.userIsDeleting = !frontendFlashcard.userIsDeleting;
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	return (
		<tr
			className={frontendFlashcard.userIsDeleting ? "deleting" : ""}
			key={frontendFlashcard.suuid}
		>
			<td>{frontendFlashcard.suuid}</td>
			<td>{frontendFlashcard.category}</td>
			<td>{frontendFlashcard.front}</td>
			<td>{frontendFlashcard.back}</td>
			<td>
				<div className="flex gap-1">
					{frontendFlashcard.userIsDeleting ? (
						<>
							<RiDeleteBin6Line
								onClick={() =>
									handleDeleteFlashcard(frontendFlashcard)
								}
								className="finalDelete cursor-pointer hover:text-red-900"
							/>
							<MdCancel
								onClick={() =>
									toggleIsDeletingFlashcard(frontendFlashcard)
								}
								className="cursor-pointer hover:text-green-900"
							/>
						</>
					) : (
						<>
							<MdModeEditOutline className="cursor-pointer hover:text-green-900" />
							<RiDeleteBin6Line
								onClick={() =>
									toggleIsDeletingFlashcard(frontendFlashcard)
								}
								className="cursor-pointer hover:text-red-900"
							/>
						</>
					)}
				</div>
			</td>
		</tr>
	);
};
