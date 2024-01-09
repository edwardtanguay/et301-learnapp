/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaSave } from "react-icons/fa";
import { INewFlashcard, blankNewFlashcard } from "../shared/interfaces";
import { MdCancel } from "react-icons/md";
import { ChangeEvent, useContext } from "react";
import { AppContext } from "../AppContext";

interface IProps {
	newFlashcard: INewFlashcard;
	setIsAddingFlashcard: (isAddingFlashcard: boolean) => void;
	setNewFlashcard: (newFlashcard: INewFlashcard) => void;
}

export const ManageFlashcardsAddRow = ({ newFlashcard, setIsAddingFlashcard, setNewFlashcard }: IProps) => {
	const { saveAddFlashcard } = useContext(AppContext);

	const handleCancelAddFlashcard = () => {
		setIsAddingFlashcard(false);
		setNewFlashcard(structuredClone(blankNewFlashcard));
	};


	const handleChangeNewFlashcardField = (
		e: ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const value = e.target.value;
		switch (field) {
			case "category":
				newFlashcard.category = value;
				break;
			case "front":
				newFlashcard.front = value;
				break;
			case "back":
				newFlashcard.back = value;
				break;
		}
		const _newFlashcard = structuredClone(newFlashcard);
		setNewFlashcard(_newFlashcard);
	};

	const handleSaveAddFlashcard = () => {
		(async () => {
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
		})();
	};

	return (
		<>
			<tr>
				<td></td>
				<td>
					<input
						value={newFlashcard.category}
						onChange={(e) =>
							handleChangeNewFlashcardField(e, "category")
						}
						className="w-full"
					/>
				</td>
				<td>
					<input
						value={newFlashcard.front}
						onChange={(e) =>
							handleChangeNewFlashcardField(e, "front")
						}
						className="w-full"
					/>
				</td>
				<td>
					<input
						value={newFlashcard.back}
						onChange={(e) =>
							handleChangeNewFlashcardField(e, "back")
						}
						className="w-full"
					/>
				</td>
				<td>
					<div className="flex gap-1">
						<FaSave
							onClick={handleSaveAddFlashcard}
							className="cursor-pointer hover:text-green-900"
						/>
						<MdCancel
							onClick={handleCancelAddFlashcard}
							className="cursor-pointer hover:text-red-900"
						/>
					</div>
				</td>
			</tr>
		</>
	);
};
