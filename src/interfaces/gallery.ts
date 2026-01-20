export type GalleryType = 'prensa' | 'radio' | 'television' | 'digital';

export interface Gallery {
    id: string;
    title: string;
    description: string;
    orderIndex: number;
    url: string;
    type: GalleryType;
    createdAt: Date | string;
    updatedAt: Date | string;
    isActive: boolean;
}

export interface CreateGalleryDto {
    title: string;
    description: string;
    orderIndex: number;
    url: string;
    type: GalleryType;
    isActive?: boolean;
}

export interface UpdateGalleryDto {
    title?: string;
    description?: string;
    orderIndex?: number;
    url?: string;
    type?: GalleryType;
    isActive?: boolean;
}