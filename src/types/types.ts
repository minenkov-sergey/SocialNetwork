export type PostType = {
    id: Number,
    message: String,
    likecount: number
}
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}

 export type ProfileType = {
    userId: Number | null
    lookingForAJob: Boolean
    lookingForAJobDescription: String
    fullName: string
    contacts: ContactsType
    photos: PhotosType
}

export type UserType = {
    id: number
    name: string
    status: string | null
    photos: PhotosType
    followed: boolean
}