export type ContentType = 'instagram' | 'facebook' | 'tiktok' | 'youtube' | 'linkedin' | 'twitter';

export interface Content {
    id: string;
    title: string;
    description: string;
    date?: Date | string | null;
    image: string;
    profileUrl: string;
    url: string;
    location?: string | null;
    orderIndex: number;
    type: ContentType;
    createdAt: Date | string;
    updatedAt: Date | string;
    isActive: boolean;
}

export interface CreateContentDto {
    title: string;
    description: string;
    date?: Date | string | null;
    image: string;
    profileUrl: string;
    url: string;
    location?: string | null;
    orderIndex: number;
    type: ContentType;
    isActive?: boolean;
}

export interface UpdateContentDto {
    title?: string;
    description?: string;
    date?: Date | string | null;
    image?: string;
    profileUrl?: string;
    url?: string;
    location?: string | null;
    orderIndex?: number;
    type?: ContentType;
    isActive?: boolean;
}