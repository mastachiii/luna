export default function SignUp() {
    return (
        <form>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" required />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" required />
        </form>
    );
}
