import React, { createContext, useContext, useState } from 'react'

export const ProfileContext = createContext()

const ProfileContextProvider = ({ children }) => {
    const [profile, setProfile] = useState(false)
    return (
        <ProfileContext.Provider value={[profile, setProfile]}>
            {children}
        </ProfileContext.Provider>
    )
}
export default ProfileContextProvider

export function useProfile() {
    return useContext(ProfileContext)
} 