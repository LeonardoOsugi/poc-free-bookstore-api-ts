export type Signup= {
    name: string,
    email: string ,
    password: string
};

export type Signin = {
    email: string,
    password: string
}

export type Session = {
    token: string, 
    userId: number
}