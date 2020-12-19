export class User {
    constructor(
        public id: string,
        public email: string,
        private _token: string,
        private _tokenExpiredDate: Date
    ){}

    get token() {
        if(!this._tokenExpiredDate || new Date() > this._tokenExpiredDate) {
            return null;
        }

        return this._token;
    }
}