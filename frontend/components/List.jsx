
export default function List({ list, user }) {

    return (
        <div style={{ background: "gray", fontSize: 23 }}>
            <a href={`/${user}/${list.listName}`}>{list.listName}</a>
            <p>{list.description}</p>
            <p>{list.isPublic ? "Public" : "Private"}</p>
            <p>{list.createdAt}</p>
            <p>{list.isFavorite ? "Favorite" : ""}</p>
        </div>
    );
}