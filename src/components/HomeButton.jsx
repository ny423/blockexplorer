import history from "../router/history"

export default function HomeButton() {
    return (
        <button onClick={() => history.push('/')}>
            Back To Home
        </button>)
}