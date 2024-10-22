function Error({message}){
    return (
        <h1 className="error-message">
            {message ? `Error: ${message}` : "Error: page not found"}
        </h1>
    );
}
export default Error