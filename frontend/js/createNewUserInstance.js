function createNewUserInstance(user) {
    const firstName = user["first_name"];
    const lastName = user["last_name"];
    const password = user["password"];
    const email = user["email"];
    const birthday = user["birthday"];
    const id = user["id"];
    return new User(id, firstName, lastName, email, password, birthday);
}
