import Cache from "./cache";
import FetchAPI from "../libs/fetch";
import { Category, Institution, Person } from "../interfaces/pep";

export async function getPEPList(): Promise<{ success: boolean, data: Record<string, any>[] } | { success: boolean, message: string }> {
    try {
        const cache = Cache.getInstance();
        const pepList = cache.get('pep_list');
        if (!pepList) {
            const pepListData = await getPEPListFromCommissionAgainstCorruption();
            const formattedList = formatPEPListFromCommissionAgainstCorruption(pepListData);
            cache.set('pep_list', JSON.stringify(formattedList));
            
            return {
                success: true,
                data: formattedList
            }
        }

        return {
            success: true,
            data: JSON.parse(pepList)
        }
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: error instanceof Error ? error.message : JSON.stringify(error)
        }
    }
}

export async function getPEPListFromCommissionAgainstCorruption() {
    const request = await FetchAPI.get('https://register.caciaf.bg/2022/list.xml');

    return request.data;
}

export function formatPEPListFromCommissionAgainstCorruption(data: string): Person[] {
    const categories: Person[] = [];

    const allCategories = data.split('</Category>');

    // Initialize variables to store the current category, institution, person, and position
    let currentCategory: Category | undefined;
    let currentInstitution: Institution | undefined;
    let currentPerson: Person | undefined;

    for (const line of allCategories) {
        const categoryName = line.match(/<Category Name="(.*?)"><Institution/)?.[1];
        if(categoryName) {
            currentCategory = { Name: categoryName, Institution: [] }
        }
        const allInstitutions = line.split('</Institution>');
        for (const institutionLine of allInstitutions) {
            const institutionName = institutionLine.match(/<Institution Name="(.*?)" Show="False">/)?.[1];
            if (currentCategory && institutionName) {
                currentInstitution = { Name: institutionName, Person: [] }
                currentCategory.Institution.push(currentInstitution);
            }

            const allPeople = institutionLine.split('</Position></Person>');

            for (const peopleLine of allPeople) {
                const personName = peopleLine.match(/<Person><Name>(.*?)<\/Name><Position>/)?.[1];
                const positionName = peopleLine.match(/<\/Name><Position><Name>(.*?)<\/Name>/)?.[1];
                if (currentInstitution && personName && positionName) {
                    currentPerson = { 
                        Name: personName, 
                        Position: positionName,
                        Category: categoryName as string,
                        Institution: institutionName as string
                    };
                    categories.push(currentPerson);
                }
            }
        }
    }

    return categories as Person[];
}