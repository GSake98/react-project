import {Client, Databases, ID, Query} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1').setProject(PROJECT_ID);

const db = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {

    try{
        const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        if(result.documents.length > 0) {
            const document = result.documents[0];
            const count = document.count + 1;
            await db.updateDocument(DATABASE_ID, COLLECTION_ID, document.$id, {
                count: count
            });
        } else {
            await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            })
        }
    } catch (e) {
        console.error(e);
    }
}

export const getTrendingMovies = async () => {
    try {
        const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(10),
            Query.orderDesc('count'),
        ]);

        return result.documents;
    } catch (e) {
        console.error(e);
    }
};