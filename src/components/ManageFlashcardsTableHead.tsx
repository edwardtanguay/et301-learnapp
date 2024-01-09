import { SiOneplus } from "react-icons/si";

interface IProps {
	isAddingFlashcard: boolean;
	setIsAddingFlashcard: (isAddingFlashcard: boolean) => void;

}

export const ManageFlashcardsTableHead = ({isAddingFlashcard, setIsAddingFlashcard}:IProps) => {
	return (
		<thead>
			<tr>
				<th>SUUID</th>
				<th>Category</th>
				<th>Front</th>
				<th>Back</th>
				<th>
					<div className="flex justify-center text-[#222] text-2xl">
						<SiOneplus
							onClick={() =>
								setIsAddingFlashcard(!isAddingFlashcard)
							}
							className="cursor-pointer hover:text-green-900"
						/>
					</div>
				</th>
			</tr>
		</thead>
	);
};
