export interface Pedido {
    monto: number,
    pedidosId: string,
    restaurantId: number,
    userId: number,
    permiso_user: number
}

export interface RestaurantePedido {
    restaurant_name: string,
    imageUrl: string,
    pedidoId: number
}