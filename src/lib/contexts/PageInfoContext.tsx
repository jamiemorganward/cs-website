'use client'
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from 'react'

interface PageInfoContextType {
  projectName: string
  setProjectName: Dispatch<SetStateAction<string>>
}

const initialState = {
  projectName: '',
  setProjectName: () => {}
}

export const PageInfoContext = createContext<PageInfoContextType>(initialState)

export const PageInfoContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [projectName, setProjectName] = useState<string>(
    initialState.projectName
  )

  return (
    <PageInfoContext.Provider value={{ projectName, setProjectName }}>
      {children}
    </PageInfoContext.Provider>
  )
}
