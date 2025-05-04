// This is a mock API service that would be replaced with real API calls
// when the endpoints are available

// Define types based on your database schema
export interface User {
  idUsuario: number
  nombreCompleto: string
  correo: string
  idRol: number
}

export interface Movie {
  idPelicula: number
  titulo: string
  descripcion: string
  duracionMinutos: number
  genero: string
  clasificacionEdad: string
  estado: boolean
  imagen?: string
}

export interface Sala {
  idSala: number
  nombreSala: string
  capacidad: number
  estado: boolean
}

export interface Funcion {
  idFuncion: number
  idPelicula: number
  idSala: number
  fechaInicio: string
  precioEntrada: number
  estado: boolean
  titulo?: string
  nombreSala?: string
}

export interface Butaca {
  numeroButaca: number
  ocupado: boolean
}

export interface DetalleCompra {
  idFuncion: number
  cantidad: number
  subtotal: number
}

export interface Compra {
  idUsuario: number
  total: number
  detallesCompra: DetalleCompra[]
}

// Mock API functions
export const api = {
  // User authentication
  login: async (correo: string, clave: string) => {
    // This would be a real API call in production
    // Simulating a database check
    if (correo === "demo@cinetick.com" && clave === "demo123") {
      return { success: true, user: { idUsuario: 1, nombreCompleto: "Usuario Demo", correo, idRol: 1 } }
    } else if (correo === "admin@cinetick.com" && clave === "admin123") {
      return { success: true, user: { idUsuario: 2, nombreCompleto: "Administrador", correo, idRol: 2 } }
    }
    return { success: false, message: "Credenciales incorrectas" }
  },

  register: async (nombreCompleto: string, correo: string, clave: string) => {
    // This would be a real API call in production using USP_INSERT_USUARIO
    return { success: true, user: { idUsuario: 2, nombreCompleto, correo, idRol: 1 } }
  },

  // Movies
  getMovies: async () => {
    // This would be a real API call in production
    return [
      {
        idPelicula: 1,
        titulo: "Oppenheimer",
        descripcion:
          "La película sigue a J. Robert Oppenheimer, el físico teórico que dirigió el Proyecto Manhattan durante la Segunda Guerra Mundial.",
        duracionMinutos: 180,
        genero: "Drama, Historia",
        clasificacionEdad: "13+",
        estado: true,
        imagen: "/images/oppenheimer.png",
      },
      {
        idPelicula: 2,
        titulo: "Avatar",
        descripcion:
          "Un marine parapléjico enviado a la luna Pandora en una misión única se debate entre seguir sus órdenes y proteger el mundo que siente como su hogar.",
        duracionMinutos: 162,
        genero: "Ciencia Ficción, Aventura",
        clasificacionEdad: "13+",
        estado: true,
        imagen: "/images/avatar.png",
      },
      {
        idPelicula: 3,
        titulo: "El Padrino",
        descripcion: "La historia de la familia Corleone, una de las más poderosas dinastías criminales de Nueva York.",
        duracionMinutos: 175,
        genero: "Drama, Crimen",
        clasificacionEdad: "18+",
        estado: true,
        imagen: "/images/godfather.png",
      },
      {
        idPelicula: 4,
        titulo: "Joker",
        descripcion: "Un comediante fallido se vuelve loco y se convierte en un asesino psicópata y genio del crimen.",
        duracionMinutos: 122,
        genero: "Drama, Thriller",
        clasificacionEdad: "18+",
        estado: true,
        imagen: "/images/joker.png",
      },
      {
        idPelicula: 5,
        titulo: "Dune",
        descripcion:
          "Un joven brillante y talentoso, nacido con un destino más grande que él mismo, debe viajar al planeta más peligroso del universo para asegurar el futuro de su familia y su gente.",
        duracionMinutos: 155,
        genero: "Ciencia Ficción, Aventura",
        clasificacionEdad: "13+",
        estado: true,
        imagen: "/images/dune.png",
      },
    ]
  },

  // Funciones (Showtimes) - Using USP_SEARCH_FUNCIONES
  getFunciones: async (titulo?: string, fechaInicio?: string) => {
    // This would be a real API call in production
    return [
      {
        idFuncion: 1,
        idPelicula: 1,
        idSala: 1,
        fechaInicio: "2025-05-01T20:00:00",
        precioEntrada: 12.5,
        estado: true,
        titulo: "Oppenheimer",
        nombreSala: "Sala 1",
      },
      {
        idFuncion: 2,
        idPelicula: 1,
        idSala: 1,
        fechaInicio: "2025-05-02T18:00:00",
        precioEntrada: 15.0,
        estado: true,
        titulo: "Oppenheimer",
        nombreSala: "Sala 1",
      },
      {
        idFuncion: 3,
        idPelicula: 2,
        idSala: 2,
        fechaInicio: "2025-05-01T19:00:00",
        precioEntrada: 12.5,
        estado: true,
        titulo: "Avatar",
        nombreSala: "Sala 2",
      },
      {
        idFuncion: 4,
        idPelicula: 3,
        idSala: 3,
        fechaInicio: "2025-05-03T20:30:00",
        precioEntrada: 14.0,
        estado: true,
        titulo: "El Padrino",
        nombreSala: "Sala 3",
      },
    ]
  },

  // Butacas (Seats)
  getButacas: async (idFuncion: number) => {
    // This would be a real API call in production
    const butacas: Butaca[] = []

    // Generate 100 seats with some random ones occupied
    for (let i = 1; i <= 100; i++) {
      butacas.push({
        numeroButaca: i,
        ocupado: Math.random() < 0.3, // 30% chance of being occupied
      })
    }

    return butacas
  },

  // Compras (Purchases) - Using USP_INSERT_COMPRA
  createCompra: async (compra: Compra) => {
    // This would be a real API call in production
    return { success: true, idCompra: 1 }
  },

  // Get purchase details - Using USP_GET_COMPRA_DETALLE
  getCompraDetalle: async (idCompra: number) => {
    // This would be a real API call in production
    return {
      idCompra: 1,
      usuario: "Usuario Demo",
      fechaCompra: "2025-05-01T10:30:00",
      total: 40.0,
      detalles: [
        {
          idDetalle: 1,
          titulo: "Oppenheimer",
          nombreSala: "Sala 1",
          fechaInicio: "2025-05-01T20:00:00",
          cantidad: 2,
          subtotal: 25.0,
        },
        {
          idDetalle: 2,
          titulo: "Oppenheimer",
          nombreSala: "Sala 1",
          fechaInicio: "2025-05-02T18:00:00",
          cantidad: 1,
          subtotal: 15.0,
        },
      ],
    }
  },

  // Get sales report - Using USP_REPORTE_VENTAS
  getReporteVentas: async () => {
    return [
      {
        fecha: "2025-05-01",
        totalVentas: 1250.0,
        numeroCompras: 25,
      },
      {
        fecha: "2025-05-02",
        totalVentas: 980.5,
        numeroCompras: 18,
      },
      {
        fecha: "2025-05-03",
        totalVentas: 1450.0,
        numeroCompras: 30,
      },
    ]
  },

  // Get roles - Using USP_SELECT_ROLES
  getRoles: async () => {
    return [
      { value: 1, name: "Cliente" },
      { value: 2, name: "Administrador" },
    ]
  },

  // Create function - Using USP_INSERT_FUNCION
  createFuncion: async (funcion: Omit<Funcion, "idFuncion">) => {
    // This would be a real API call in production
    return { success: true, idFuncion: 5 }
  },
}
