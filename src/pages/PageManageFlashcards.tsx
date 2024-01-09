/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { MdModeEditOutline, MdCancel } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
	IFrontendFlashcard,
	INewFlashcard,
	blankNewFlashcard,
	convertFrontendFlashcardToFlaschard,
} from "../shared/interfaces";
import { ManageFlashcardsTableHead } from "../components/ManageFlashcardsTableHead";
import { ManageFlashcardsAddRow } from "../components/ManageFlashcardsAddRow";

export const PageManageFlashcards = () => {
	const {
		frontendFlashcards,
		setFrontendFlashcards,
		deleteFlashcard,
	} = useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

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
		<>
			<p>There are {frontendFlashcards.length} flashcards:</p>

			<form>
				<table className="dataTable mt-4 w-[70rem]">
					<ManageFlashcardsTableHead
						isAddingFlashcard={isAddingFlashcard}
						setIsAddingFlashcard={setIsAddingFlashcard}
					/>
					<tbody>
						{isAddingFlashcard && <ManageFlashcardsAddRow newFlashcard={newFlashcard} setIsAddingFlashcard={setIsAddingFlashcard} setNewFlashcard={setNewFlashcard} />}
						{frontendFlashcards.map((frontendFlashcard) => {
							return (
								<tr
									className={
										frontendFlashcard.userIsDeleting
											? "deleting"
											: ""
									}
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
															handleDeleteFlashcard(
																frontendFlashcard
															)
														}
														className="finalDelete cursor-pointer hover:text-red-900"
													/>
													<MdCancel
														onClick={() =>
															toggleIsDeletingFlashcard(
																frontendFlashcard
															)
														}
														className="cursor-pointer hover:text-green-900"
													/>
												</>
											) : (
												<>
													<MdModeEditOutline className="cursor-pointer hover:text-green-900" />
													<RiDeleteBin6Line
														onClick={() =>
															toggleIsDeletingFlashcard(
																frontendFlashcard
															)
														}
														className="cursor-pointer hover:text-red-900"
													/>
												</>
											)}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</form>
		</>
	);
};
