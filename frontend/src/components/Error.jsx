function Error({message}){
    return <h1>{message ? `Error: ${message}` : "Error: page not found"}</h1>
}
export default Error