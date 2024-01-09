export interface INewFlashcard {
	category: string;
	front: string
	back: string;
}

export const blankNewFlashcard: INewFlashcard = {
	category: 'linux',
	front: '',
	back: ''
}

export interface IFlashcard extends INewFlashcard {
	suuid: string;
}

export interface IFrontendFlashcard extends IFlashcard {
	userIsDeleting: boolean;
	userIsEditing: boolean;
}

export interface IPatchFlashcard {
	category?: string;
	front?: string
	back?: string;
}

export interface IDatabase {
	flashcards: IFlashcard[];
}

export interface IPromiseResolution {
	message: string;
}

export const convertFrontendFlashcardToFlaschard = (frontendFlashcard: IFrontendFlashcard): IFlashcard => {
	return {
		suuid: frontendFlashcard.suuid,
		category: frontendFlashcard.category,
		front: frontendFlashcard.front,
		back: frontendFlashcard.back
	}
}

export const convertFlashcardToFrontendFlaschard = (flashcard: IFlashcard): IFrontendFlashcard => {
	return {
		suuid: flashcard.suuid,
		category: flashcard.category,
		front: flashcard.front,
		back: flashcard.back,
		userIsDeleting: false,
		userIsEditing: false
	}
} 