export interface IUser {
    id?: number;
    user: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono?: string;
    descripcion?: string;
    puntos?: number;
    imagen?: string;
    estado?: boolean;
    role?: any;
    createdAt?: number;
    updatedAt?: number;
}
