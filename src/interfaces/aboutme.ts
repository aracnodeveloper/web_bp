export type AboutMeType = 'goals' | 'recognitions' | 'photo' | 'blog';

export interface AboutMe {
    id: string;
    title: string;
    description: string;
    date?: Date | string | null;
    icon?: string | null;
    image?: string | null;
    url?: string | null;
    location?: string | null;
    orderIndex: number;
    type: AboutMeType;
    createdAt: Date | string;
    updatedAt: Date | string;
    isActive: boolean;
}

export interface CreateAboutMeDto {
    title: string;
    description: string;
    date?: Date | string | null;
    icon?: string | null;
    image?: string | null;
    url?: string | null;
    location?: string | null;
    orderIndex: number;
    type: AboutMeType;
    isActive?: boolean;
}

export interface UpdateAboutMeDto {
    title?: string;
    description?: string;
    date?: Date | string | null;
    icon?: string | null;
    image?: string | null;
    url?: string | null;
    location?: string | null;
    orderIndex?: number;
    type?: AboutMeType;
    isActive?: boolean;
}

export interface UploadResponse {
    success: boolean;
    message: string;
    data: {
        filename: string;
        originalName: string;
        size: number;
        mimetype: string;
        url: string;
    };
}