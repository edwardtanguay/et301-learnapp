/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import {
	INewFlashcard,
	blankNewFlashcard,
} from "../shared/interfaces";
import { ManageFlashcardsTableHead } from "../components/ManageFlashcardsTableHead";
import { ManageFlashcardsAddRow } from "../components/ManageFlashcardsAddRow";
import { ManageFlashcardsMainRow } from "../components/ManageFlashcardsMainRow";

export const PageManageFlashcards = () => {
	const { frontendFlashcards } =
		useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

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
						{isAddingFlashcard && (
							<ManageFlashcardsAddRow
								newFlashcard={newFlashcard}
								setIsAddingFlashcard={setIsAddingFlashcard}
								setNewFlashcard={setNewFlashcard}
							/>
						)}
						{frontendFlashcards.map((frontendFlashcard) => {
							return <ManageFlashcardsMainRow frontendFlashcard={frontendFlashcard} />;
						})}
					</tbody>
				</table>
			</form>
		</>
	);
};
