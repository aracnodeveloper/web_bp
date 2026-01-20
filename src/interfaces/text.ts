export type ContentType = 'portada' | 'sobre-mi';

export interface Text {
    id: string;
    title: string;
    description: string;
    icon?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    type: ContentType;
    isActive: boolean;
}