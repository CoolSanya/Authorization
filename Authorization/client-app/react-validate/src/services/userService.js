class userServ {

    URL_REGISTER = "/api/User/user-register";
    URL_LOGIN = "/api/User/user-login";
    URL_LOGOUT = "/api/User/user-logout";

    async register(user) {
        let isRegister = await fetch(this.URL_REGISTER, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(user)
        }).then(responce => {
            console.log(responce.status)
            if (responce.status === 201) {
                return true;
            }
            else {
                return false;
            }
        });

        return isRegister;
    }

    async login(data) {
        let isLogin = await fetch(this.URL_LOGIN, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
        }).then(responce => {
            if (responce.status === 200) {
                return true;
            }
            else {
                return false;
            }
        });

        return isLogin;
    }

    async logout(user) {
        let isRegister = await fetch(this.URL_REGISTER, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(user)
        }).then(responce => {
            console.log(responce.status)
            if (responce.status === 201) {
                return true;
            }
            else {
                return false;
            }
        });

        return isRegister;
    }


}

let userService = new userServ();
export default userService;