import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router'


export const LocaleContext = React.createContext({
  selectedlocale: null,
  handleSetLocale: () => null
})

const LocaleProvider = ({ children }) => {
  const router = useRouter();
  const [selectedlocale, setLocale] = useState(null)

  // // store the preference
  // React.useEffect(() => {
  //   if (locale !== localStorage.getItem('locale')) {
  //     localStorage.setItem('locale', locale)
  //   }
  // }, [locale])

  const handleSetLocale = (locale) => {
    setLocale(locale)
  }


  return <LocaleContext.Provider value={{ selectedlocale, handleSetLocale }} >
    {children}
  </LocaleContext.Provider>
}

function useLocale() {
  const context = React.useContext(LocaleContext);

  if (context === undefined) {
    throw new Error(`useLocale must be used within a LocaleProvider`);
  }
  return context;
}

export { LocaleProvider, useLocale };