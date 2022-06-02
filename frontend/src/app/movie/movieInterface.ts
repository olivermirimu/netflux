export interface MovieInterface {
    title: string;
    releaseYear: string;
    duration: string;
    rating: string;
    genre: string;
    director: string;
    writer: string;
    actors?: string[];
    plot?: string;
    awards?: string;
    imageUrl: string;
    cover: string;
}

export interface MovieResolved {
    movie: MovieInterface;
    error?: any;
}
