import { useState } from "react"
import { SearchMenu } from "./search-menu"


export function HeaderFilter({ onSetFilter }) {
  
  return (
        <div className="search-form-menu-container">
          <SearchMenu />
        </div>

    

  )
}
