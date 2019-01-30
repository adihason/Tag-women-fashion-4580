class User{
    constructor(id, firstName, lastName, email, password, birthday){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
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