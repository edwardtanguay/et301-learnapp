/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
import {
	IFlashcard,
	IFrontendFlashcard,
	INewFlashcard,
	IPromiseResolution,
	convertFlashcardToFrontendFlaschard,
} from "./shared/interfaces";
import axios from "axios";

interface IAppContext {
	frontendFlashcards: IFrontendFlashcard[];
	setFrontendFlashcards: (frontendFlashcards: IFrontendFlashcard[]) => void;
	saveAddFlashcard: (
		newFlashcard: INewFlashcard
	) => Promise<IPromiseResolution>;
	deleteFlashcard: (flashcard: IFlashcard) => Promise<IPromiseResolution>;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = "http://localhost:4206";

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [frontendFlashcards, setFrontendFlashcards] = useState<
		IFrontendFlashcard[]
	>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/api/flashcards`);
			const _flashcards = response.data;

			const _frontendFlashcards: IFrontendFlashcard[] = [];
			for (const _flashcard of _flashcards) {
				const _frontendFlashcard: IFrontendFlashcard = {
					..._flashcard,
					userIsDeleting: false,
					userIsEditing: false
				};
				_frontendFlashcards.push(_frontendFlashcard);
			}
			setFrontendFlashcards(_frontendFlashcards);
		})();
	}, []);

	const saveAddFlashcard = async (newFlashcard: INewFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			(async () => {
				try {
					const response = await axios.post(
						`${backendUrl}/api/flashcards`,
						newFlashcard,
						{ headers }
					);
					if (response.status === 201) {
						const _flashcard: IFlashcard = response.data;
						const _frontendFlashcard =
							convertFlashcardToFrontendFlaschard(_flashcard);
						frontendFlashcards.push(_frontendFlashcard);
						const _flashcards = structuredClone(frontendFlashcards);
						setFrontendFlashcards(_flashcards);
						resolve({ message: "ok" });
					} else {
						reject({
							message: `ERROR: status code ${response.status}`,
						});
					}
				} catch (e: any) {
					reject({
						message: `ERROR: ${e.message}`,
					});
				}
			})();
		});
	};

	const deleteFlashcard = async (flashcard: IFlashcard) => {
		return new Promise<IPromiseResolution>((resolve, reject) => {
			(async () => {
				try {
					const response = await axios.delete(
						`${backendUrl}/api/flashcards/${flashcard.suuid}`
					);
					if (response.status === 200) {
						const flashcard: IFlashcard = response.data;
						const indexToRemove = frontendFlashcards.findIndex(
							(m) => m.suuid === flashcard.suuid
						);
						if (indexToRemove !== -1) {
							frontendFlashcards.splice(indexToRemove, 1);
							setFrontendFlashcards(
								structuredClone(frontendFlashcards)
							);
							resolve({ message: "ok" });
						} else {
							reject({
								message: `flashcard with suuid ${flashcard.suuid} not found`,
							});
						}
					} else {
						reject({
							message: `ERROR: status code ${response.status}`,
						});
					}
				} catch (e: any) {
					reject({
						message: `ERROR: ${e.message}`,
					});
				}
			})();
		});
	};

	return (
		<AppContext.Provider
			value={{
				frontendFlashcards,
				saveAddFlashcard,
				deleteFlashcard,
				setFrontendFlashcards,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
