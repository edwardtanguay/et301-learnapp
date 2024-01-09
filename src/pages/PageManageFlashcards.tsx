/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { AppContext } from "../AppContext";
import {
	IFrontendFlashcard,
	INewFlashcard,
	blankNewFlashcard,
} from "../shared/interfaces";
import { ManageFlashcardsTableHead } from "../components/ManageFlashcardsTableHead";
import { ManageFlashcardsAddRow } from "../components/ManageFlashcardsAddRow";
import { ManageFlashcardsMainRow } from "../components/ManageFlashcardsMainRow";
import { ManageFlashcardsEditRow } from "../components/ManageFlashcardsEditRow";
import React from "react";

export const PageManageFlashcards = () => {
	const { frontendFlashcards, setFrontendFlashcards } =
		useContext(AppContext);
	const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
	const [newFlashcard, setNewFlashcard] = useState<INewFlashcard>(
		structuredClone(blankNewFlashcard)
	);

	const toggleIsEditingFlashcard = (
		frontendFlashcard: IFrontendFlashcard
	) => {
		frontendFlashcard.userIsEditing = !frontendFlashcard.userIsEditing;
		console.log("toggling");
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
						{isAddingFlashcard && (
							<ManageFlashcardsAddRow
								newFlashcard={newFlashcard}
								setIsAddingFlashcard={setIsAddingFlashcard}
								setNewFlashcard={setNewFlashcard}
							/>
						)}
						{frontendFlashcards.map((frontendFlashcard) => {
							return (
								<React.Fragment key={frontendFlashcard.suuid}>
									{frontendFlashcard.userIsEditing ? (
										<ManageFlashcardsEditRow
											frontendFlashcard={
												frontendFlashcard
											}
											toggleIsEditingFlashcard={
												toggleIsEditingFlashcard
											}
										/>
									) : (
										<ManageFlashcardsMainRow
											frontendFlashcard={
												frontendFlashcard
											}
											toggleIsEditingFlashcard={
												toggleIsEditingFlashcard
											}
										/>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</form>
		</>
	);
};
