export default {
    base : 'http://localhost:3001/' ,
    auth : 'http://localhost:3001/api/auth/', // post
    user : 'http://localhost:3001/api/auth/user/', // get headers { 'x-auth-token : token}
    courses : 'http://localhost:3001/api/course/', // get
}