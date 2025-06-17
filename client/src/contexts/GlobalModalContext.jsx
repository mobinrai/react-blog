import React, { createContext, useContext } from 'react'

export const GlobalModalContext = createContext()


export const useModal = ()=> useContext(GlobalModalContext)