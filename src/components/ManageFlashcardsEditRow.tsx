/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext } from "react";
import { IFrontendFlashcard, convertFrontendFlashcardToFlaschard } from "../shared/interfaces";
// import { MdModeEditOutline, MdCancel } from "react-icons/md";
// import { RiDeleteBin6Line } from "react-icons/ri";
import { AppContext } from "../AppContext";
import { MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";

interface IProps {
	frontendFlashcard: IFrontendFlashcard;
	toggleIsEditingFlashcard: (frontendFlashcard: IFrontendFlashcard) => void;
}

export const ManageFlashcardsEditRow = ({
	frontendFlashcard,
	toggleIsEditingFlashcard,
}: IProps) => {
	const { frontendFlashcards, setFrontendFlashcards, saveFlashcard } =
		useContext(AppContext);

	const handleSaveFlashcard = (frontendFlashcard: IFrontendFlashcard) => {
		(async () => {
			try {
				const flashcard =
					convertFrontendFlashcardToFlaschard(frontendFlashcard);
				const response = await saveFlashcard(flashcard);
				if (response.message === "ok") {
					toggleIsEditingFlashcard(frontendFlashcard);
				}
			} catch (e: any) {
				console.log(`${e.message}`);
				alert(
					"We're sorry, your flashcard cannot be saved at this time. Try again later, or contact 2342-234-23343."
				);
			}
		})();
	};
	/*

			try {
				const response = await saveAddFlashcard(newFlashcard);
				if (response.message === "ok") {
					handleCancelAddFlashcard();
				}
			} catch (e: any) {
				console.log(`${e.message}`);
				alert(
					"We're sorry, your flashcard cannot be saved at this time. Try again later, or contact 2342-234-23343."
				);
			}

	*/

	const handleChangeFrontendFlashcardField = (
		e: ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const value = e.target.value;
		switch (field) {
			case "category":
				frontendFlashcard.category = value;
				break;
			case "front":
				frontendFlashcard.front = value;
				break;
			case "back":
				frontendFlashcard.back = value;
				break;
		}
		setFrontendFlashcards(structuredClone(frontendFlashcards));
	};

	return (
		<tr
			className={frontendFlashcard.userIsEditing ? "editing" : ""}
			key={frontendFlashcard.suuid}
		>
			<td>{frontendFlashcard.suuid}</td>
			<td>
				<input
					value={frontendFlashcard.category}
					onChange={(e) =>
						handleChangeFrontendFlashcardField(e, "category")
					}
					className="w-full"
				/>
			</td>
			<td>
				<input
					value={frontendFlashcard.front}
					onChange={(e) =>
						handleChangeFrontendFlashcardField(e, "front")
					}
					className="w-full"
				/>
			</td>
			<td>
				<input
					value={frontendFlashcard.back}
					onChange={(e) =>
						handleChangeFrontendFlashcardField(e, "back")
					}
					className="w-full"
				/>
			</td>
			<td>
				<div className="flex gap-1">
					<>
						<FaSave
							onClick={() =>
								handleSaveFlashcard(frontendFlashcard)
							}
							className="finalDelete cursor-pointer hover:text-green-900"
						/>
						<MdCancel
							onClick={() =>
								toggleIsEditingFlashcard(frontendFlashcard)
							}
							className="cursor-pointer hover:text-red-900"
						/>
					</>
				</div>
			</td>
		</tr>
	);
};
