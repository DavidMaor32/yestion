
export default function List({ list }) {

    return (
        <div>
            <h1>{list.listName}</h1>
            <p>{list.description}</p>
            <p>{list.isPublic ? "Public" : "Private"}</p>
            <p>{list.createdAt}</p>
            <p>{list.isFavorite ? "Favorite" : ""}</p>
        </div>
    );
}