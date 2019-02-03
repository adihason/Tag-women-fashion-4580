function createNewUserInstance(user) {
    const firstName = user["firstName"];
    const lastName = user["lastName"];
    const password = user["password"];
    const email = user["email"];
    const birthday = user["birthday"];
    const id = user["id"];
    const likes = user["likes"];
    const items = user["items"];
    return new User(id, firstName, lastName, email, password, birthday, likes, items);
}
