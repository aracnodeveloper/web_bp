// SOCIALS (SeguidoresRed)
export type SocialType = 'instagram_fanpage' | 'instagram_personal' | 'facebook_fanpage' | 'facebook_personal' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin';

export interface Social {
    id: string;
    title: string;
    followers: number;
    url: string;
    orderIndex?: number;
    rise?: number;
    type: SocialType;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface CreateSocialDto {
    title: string;
    followers: number;
    url: string;
    orderIndex?: number;
    rise?: number;
    type: SocialType;
    isActive?: boolean;
}

export interface UpdateSocialDto {
    title?: string;
    followers?: number;
    url?: string;
    orderIndex?: number;
    rise?: number;
    type?: SocialType;
    isActive?: boolean;
}

// GENDER (SegmentacionGenero)
export interface Gender {
    id: string;
    male: number;
    female: number;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface UpdateGenderDto {
    male?: number;
    female?: number;
    isActive?: boolean;
}

// AGE (SegmentacionEdad)
export interface Age {
    id: string;
    youngs: number;
    youngAdl?: number;
    adults: number;
    adultsOld: number;
    olds: number;
    elders: number;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface UpdateAgeDto {
    youngs?: number;
    youngAdl?: number;
    adults?: number;
    adultsOld?: number;
    olds?: number;
    elders?: number;
    isActive?: boolean;
}

// LOCATION (SegmentacionGeografica)
export type LocationType = 'country' | 'city';

export interface Location {
    id: string;
    title: string;
    colors?: any;
    orderIndex?: number;
    rise?: number;
    type: LocationType;
    isActive: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export interface CreateLocationDto {
    title: string;
    colors?: any;
    orderIndex?: number;
    rise?: number;
    type: LocationType;
    isActive?: boolean;
}

export interface UpdateLocationDto {
    title?: string;
    colors?: any;
    orderIndex?: number;
    rise?: number;
    type?: LocationType;
    isActive?: boolean;
}