import { ICharacter } from "../types/chart";

export async function getStudents():Promise<ICharacter[]> {
	const response = await fetch('https://hp-api.onrender.com/api/characters');
	return await response.json();
}