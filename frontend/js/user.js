class User{
    constructor(id, firstName, lastName, email, password, birthday, likes, items){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.likes = likes;
        this.items = items;
    }

    // static createOrGet(rawUser){
    //     if(rawUser.email in User.instancesStore){
    //         return  User.instancesStore[rawUser.username];
    //     }  
    
    //     const currentInstance = new User(rawUser);
    //     User.instancesStore[currentInstance.user_name] = currentInstance;
    //     return currentInstance;
    // }

    // static instancesStore(){
    //     instancesStore = {};
    //     return instancesStore;
    // }
}