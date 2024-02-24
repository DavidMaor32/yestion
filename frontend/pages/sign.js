export default function Sign( submitHandler) {
    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}