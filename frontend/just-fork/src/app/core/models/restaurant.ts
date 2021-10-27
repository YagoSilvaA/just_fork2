export class Restaurant {
    constructor(
        public restaurant_name: string,
        public ubication: string,
        public open_time: Date,
        public close_time: Date,
        public imageUrl: string,
        public userId: number
    ){}
}